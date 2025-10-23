import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DiscountDto } from './dto/discount.request.dto';
import { BaseService } from 'src/common/services/base-service';
import ShortUniqueId from 'short-unique-id';
import { DiscountLevelEnums } from 'src/common/enums/enums';
import { categories, discounts, items } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DiscountsService {
  private categoriesRep: BaseService<categories>;
  private discountsRep: BaseService<discounts>;
  private itemsRep: BaseService<items>;
  constructor(
    private prismaService: PrismaService, // Inject the PrismaService
  ) {
    this.categoriesRep = new BaseService<categories>(
      this.prismaService,
      'categories',
    );

    this.itemsRep = new BaseService<items>(
        this.prismaService,
        'items',
    );

    this.discountsRep = new BaseService<discounts>(
        this.prismaService,
        'discounts',
    );
  }

  async create(body: DiscountDto): Promise<discounts> {
    const otpGenerator = new ShortUniqueId({ length: 8 });
    const unique_code = otpGenerator.randomUUID(8);
    
    let discountData: any = {
      type: body.type,
      level: body.level,
      unique_code: unique_code,
      value: body.value,
      expiryDate: new Date(body.expiryDate),
      active: true,
    };

    const discount = await this.discountsRep.save(discountData)
  
    if (body.level === DiscountLevelEnums.CATEGORY) {
      const categories = await this.categoriesRep.findByIds(body.data);
      if(categories?.length > 0) {
        for(let i = 0; i < categories.length; i++) {
          const discountFound = await this.prismaService.discount_categories.findFirst({
            where: {
              categoryId: categories[i].id,
            }
          })
          if(discountFound) {
            await this.prismaService.discount_categories.deleteMany({
              where: {
                categoryId: categories[i].id,
              }
            })
          }
        }
      }
      await this.prismaService.discount_categories.createMany({
        data: categories.map(category => ({
          categoryId: category.id,
          discountId: discount.id
        }))
      });
    } else if (body.level === DiscountLevelEnums.ITEM) {
      const items = await this.itemsRep.findByIds(body.data);
      if(items?.length > 0) {
        for(let i = 0; i < items.length; i++) {
          const discountFound = await this.prismaService.discount_items.findFirst({
            where: {
              itemId: items[i].id,
            }
          })
          if(discountFound) {
            await this.prismaService.discount_items.deleteMany({
              where: {
                itemId: items[i].id,
              }
            })
          }
        }
      }
      await this.prismaService.discount_items.createMany({
        data: items.map(item => ({
          itemId: item.id,
          discountId: discount.id
        }))
      });
    }
  
    return discount;
  }
  
  async findAll(): Promise<discounts[]> {
    return await this.discountsRep.findAll({
      where: {
        deleted_at: false
      },
      include: {
        items: {
            include: {
                item: true
            }
        },
        categories: {
            include: {
                category: true
            } 
        },
      }
    });
  }

  async findOne(id: string): Promise<discounts> {
    const data = await this.discountsRep.findOne({
      where: {
        id,
        deleted_at: false
      },
      include: {
        items: {
            include: {
                item: true
            }
        },
        categories: {
            include: {
                category: true
            } 
        },
      }
    });

    if(!data) {
        throw new HttpException('Discount not found!', HttpStatus.BAD_REQUEST)
    }
    return data;
  }

  async update(id: string, body: DiscountDto): Promise<discounts> {
    const existingDiscount = await this.findOne(id);
    if (!existingDiscount) {
      throw 'Discount not found!';
    }

    await this.prismaService.discount_categories.deleteMany({
        where: {
            discountId: id
        }
    })

    await this.prismaService.discount_items.deleteMany({
        where: {
            discountId: id
        }
    })

    const unique_code = existingDiscount.unique_code

    let newDiscount: any = {
        type: body.type,
        level: body.level,
        unique_code,
        value: body.value,
        expiryDate: new Date(body.expiryDate),
        active: true,
      };

      if (body.level === DiscountLevelEnums.CATEGORY) {
        const categories = await this.categoriesRep.findByIds(body.data);
        if(categories?.length > 0) {
          for(let i = 0; i < categories.length; i++) {
            const discountFound = await this.prismaService.discount_categories.findFirst({
              where: {
                categoryId: categories[i].id,
              }
            })
            if(discountFound) {
              await this.prismaService.discount_categories.deleteMany({
                where: {
                  categoryId: categories[i].id,
                }
              })
            }
          }
        }
        await this.prismaService.discount_categories.createMany({
          data: categories.map(category => ({
            categoryId: category.id,
            discountId: id
          }))
        });
      } else if (body.level === DiscountLevelEnums.ITEM) {
        const items = await this.itemsRep.findByIds(body.data);
        if(items?.length > 0) {
          for(let i = 0; i < items.length; i++) {
            const discountFound = await this.prismaService.discount_items.findFirst({
              where: {
                itemId: items[i].id,
              }
            })
            if(discountFound) {
              await this.prismaService.discount_items.deleteMany({
                where: {
                  itemId: items[i].id,
                }
              })
            }
          }
        }
        await this.prismaService.discount_items.createMany({
          data: items.map(item => ({
            itemId: item.id,
            discountId: id
          }))
        });
      }

    await this.discountsRep.update(id, newDiscount);
    return await this.findOne(id)
  }

  async remove(id: string): Promise<discounts> {
    const data = await this.findOne(id);
    if (!data || data.deleted_at) {
      throw 'Discount not Found!';
    }

    await this.discountsRep.softDelete(id);
    return data;
  }

  async delete(id: string): Promise<discounts> {
    const data = await this.findOne(id);
    if (!data) {
      throw 'Discount not Found!';
    }

    await this.discountsRep.delete(id);
    return data;
  }
}
