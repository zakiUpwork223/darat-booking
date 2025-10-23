import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/services/base-service';
import { DiscountTypeEnums } from 'src/common/enums/enums';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartDto, CustomerCartDto, RemoveCartItemDto } from './dto/create-cart.dto';
import {
  categories,
  items,
  item_variants,
  cart,
  cart_items,
  discount_categories,
  discount_items,
  discounts,
} from '@prisma/client';
import ShortUniqueId from 'short-unique-id';
@Injectable()
export class CartService {
  private cartRep: BaseService<cart>;
  private cartItemRep: BaseService<cart_items>;
  private variantRep: BaseService<item_variants>;
  private itemsRep: BaseService<items>;
  private categoryRep: BaseService<categories>;
  private discountCatRep: BaseService<discount_categories>;
  private discountItemsRep: BaseService<discount_items>;
  private discountRep: BaseService<discounts>;
  constructor(private prismaService: PrismaService) {
    this.categoryRep = new BaseService<categories>(
      this.prismaService,
      'categories',
    );

    this.itemsRep = new BaseService<items>(this.prismaService, 'items');

    this.variantRep = new BaseService<item_variants>(
      this.prismaService,
      'item_variants',
    );

    this.cartItemRep = new BaseService<cart_items>(
      this.prismaService,
      'cart_items',
    );

    this.cartRep = new BaseService<cart>(this.prismaService, 'cart');

    this.discountCatRep = new BaseService<discount_categories>(
      this.prismaService,
      'discount_categories',
    );
    this.discountItemsRep = new BaseService<discount_items>(
      this.prismaService,
      'discount_items',
    );

    this.discountRep = new BaseService<discounts>(
      this.prismaService,
      'discounts',
    );
  }

  async getCart(body: CustomerCartDto) {
    // console.log("body.customer_id", body.customer_id)
    // console.log("cart get cart before")
    const cart: any = await this.prismaService.cart.findFirst({
      where: {
        customerId: body.customer_id,
      },
      include: { cartItems: {
        include: {
          variant: {
            include: {
              item_id: {
                include: {
                  category_id: true,
                  discounts: {
                    include: {
                      discount: true
                    }
                  }
                }
              }
            }
          }
        }
      }},
    });

    // console.log("cart get cart", cart)

    if (cart?.cartItems?.length > 0) {
      let totalPrice = 0;
      for (let i = 0; i < cart.cartItems.length; i++) {
        const cartItem = cart.cartItems[i];
        const variant = await this.prismaService.item_variants.findFirst({
          where: {
            id: cartItem.variantId,
          },
        });
        // console.log("variant", variant)
        totalPrice =
          totalPrice +
          (await this.getTotalPrice(
            variant,
            cartItem.quantity,

          ));
          // console.log("cartItem.variant.items.categories.id", cartItem.variant.items.categories.id)
        
      }
      return {
        cart,
        totalPrice,
      };
    } else {
      return {
        cart: {
          cartItems: [],
          totalPrice: 0,
        },
      };
    }
  }

  async removeCartItem(body: RemoveCartItemDto) {
    const previouscart  = await this.prismaService.cart.findFirst({
      where: {
        customerId: body.customer_id,
      },
    });

    if(previouscart) {
      await this.prismaService.cart_items.deleteMany({
        where: {
          cartId: previouscart.id,
          variantId: body.variant_id
        }
      })
      return await this.getCart(body)
    } else {
      throw 'Customer Cart not found';
    }
  }

  async updateCart(body: CartDto) {
   
    // console.log(body)
    // //let cart
    // console.log("\n1\n")
    // cart =await this.prismaService.patient.findUnique({
    //   where: {
    //    id:"2ba1f8e9-5a03-4c31-8045-153968387890"
    //   },
    // });
    const previouscart  = await this.prismaService.cart.findFirst({
      where: {
        customerId: body.customer_id,
      },
    });
        // console.log("cart--- : ",previouscart)
    const otpGenerator = new ShortUniqueId({ length: 8 });
    const unique_code = otpGenerator.randomUUID(8);
    if(!previouscart){
      await this.prismaService.cart.create({
        data:{
          customerId:body.customer_id,
         unique_code
        }
      })
    }
    // console.log("\n2\n")

    const cart  = await this.prismaService.cart.findFirst({
      where: {
        customerId: body.customer_id,
      },
    });
    // console.log('cart', cart)
    let cartItem = null
    const itemCart: any = await this.cartItemRep.findOne({
      where: {
        cartId: cart.id,
        variantId: body.variant_id,
      },
      select: {
        id:true, 
        variant: true },
    });
    cartItem = itemCart

    // console.log("cartiTEMS", cartItem)
    // console.log('cartItem', cartItem)
    if (!cartItem) {
      cartItem = await this.prismaService.cart_items.create({
        data: {
          cartId: cart.id,
          variantId: body.variant_id,
          quantity: body.quantity,
          unique_code: otpGenerator.randomUUID(8)
        }
      })
    }
    
    if (body.quantity > cartItem?.variantId?.stock) {
      throw 'This item has limited stock';
    }
    // console.log("\n3\n")
    // console.log("cartItem?.variantId?.stock", cartItem?.id)
    // console.log("body.quantity", body.quantity)
    await this.cartItemRep.update(cartItem.id, { quantity: body.quantity });
  
    // console.log("\n4\n")
    // console.log('cartItem dataaaa', cartItem)
    return await this.getCart(body);
  }

  isDiscountValid(expiryDate: Date): boolean {
    return new Date() <= new Date(expiryDate);
  }

  async getTotalPrice(variant, quantity) {
    // console.log("variant,", variant)
    // console.log("quantity,", quantity)
    const price = variant.price * quantity;
    const item = await this.prismaService.items.findFirst({
      where: {
        id: variant.item_id,
      },
    });

    const categoryDiscount : any = await this.prismaService.discount_categories.findFirst({
      where: {
        categoryId: item.categoryId,
      },
      select: {
        discountId: true,
        discount: {
          select: {
            type: true,
            value: true,
            expiryDate: true,
          },
        },
      },
      
    });
    
    // console.log("categoryDiscount", categoryDiscount)

    const itemDiscount : any = await this.discountItemsRep.findOne({
      where: {
        itemId: item.id,
      },
      select: {
        discountId: true,
        discount: {
          select: {
            type: true,
            value: true,
            expiryDate: true,
          },
        },
      },
      
    });
    

    let totalPrice = price;
    if (categoryDiscount && this.isDiscountValid(categoryDiscount.expiryDate)) {
      if (categoryDiscount.discount.type === DiscountTypeEnums.PERCENTAGE) {
        totalPrice -= (price * parseInt(categoryDiscount.discount.value)) / 100;
        console.log("totalPrice", totalPrice)
      } else if (categoryDiscount.discount.type === DiscountTypeEnums.VALUE) {
        totalPrice -= parseInt(categoryDiscount.discount.value);
        console.log("totalPrice", totalPrice)
      }
    }

    if (itemDiscount && this.isDiscountValid(itemDiscount.discount.expiryDate)) {
      if (itemDiscount.discount.type === DiscountTypeEnums.PERCENTAGE) {
        totalPrice -= (price * parseInt(itemDiscount.discount.value)) / 100;
      } else if (itemDiscount.discount.type === DiscountTypeEnums.VALUE) {
        totalPrice -= parseInt(itemDiscount.discount.value);
      }
    }

    if (totalPrice < 0) {
      totalPrice = 0;
    }

    return totalPrice;
  }
}
