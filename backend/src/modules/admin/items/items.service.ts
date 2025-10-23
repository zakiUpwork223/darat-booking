import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ItemDto } from './dto/item.request.dto';
import { BaseService } from 'src/common/services/base-service';
import ShortUniqueId from 'short-unique-id';
import { item_colors, item_variants, items } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemsService {
  private itemsRep: BaseService<items>;
  private itemVariantsRep: BaseService<item_variants>;
  private itemColorsRep: BaseService<item_colors>;
  constructor(
    private prismaService: PrismaService, // Inject the PrismaService
  ) {
    this.itemsRep = new BaseService<items>(this.prismaService, 'items');

    this.itemVariantsRep = new BaseService<item_variants>(
      this.prismaService,
      'item_variants',
    );

    this.itemColorsRep = new BaseService<item_colors>(
      this.prismaService,
      'item_colors',
    );
  }

  async create(body: ItemDto): Promise<any> {
    console.log('\n body : ', body);

    const otpGenerator = new ShortUniqueId({ length: 8 });
    const unique_code = otpGenerator.randomUUID(8);
    Object.assign(body, { unique_code });
    console.log('\nbefore ...', body.variants);

    const { name, categoryId, attachment, variants } = body;
    console.log('\n after ...', variants);
    const payloadItem = {
      name,
      unique_code,
      categoryId,
      attachment,
    };
    const itemData = await this.itemsRep.save(payloadItem);

    if (itemData) {
      for (let i = 0; i < variants?.length; i++) {
        const variant = variants[i];
        const otpGenerator = new ShortUniqueId({ length: 8 });
        const unique_code_variant = otpGenerator.randomUUID(8);
        Object.assign(variant, {
          unique_code: unique_code_variant,
          itemId: itemData.id,
        });
        const colors = variant.colors;
        delete variant.colors;
        const variantData = await this.itemVariantsRep.save(variant);
        for (let j = 0; j < colors?.length; j++) {
          const color = colors[j];
          const otpGenerator = new ShortUniqueId({ length: 8 });
          const unique_code_color = otpGenerator.randomUUID(8);
          Object.assign(color, {
            itemVariantId: variantData.id,
            unique_code: unique_code_color,
          });
          await this.itemColorsRep.save(color);
        }
      }
      return await this.findOne(itemData?.id);
    }
  }

  async update(id: string, body: ItemDto): Promise<items> {
    const itemToUpdate: any = await this.findOne(id);
    if (!itemToUpdate) {
      throw new Error(`Item with ID ${id} not found`);
    }

    itemToUpdate.name = body.name;
    itemToUpdate.attachment = body.attachment;
    itemToUpdate.description = body.description;
    delete itemToUpdate.category_id;
    const itemVariants = itemToUpdate.variantId;
    delete itemToUpdate.variantId;
    delete itemToUpdate.id;

    if (body.variants && body.variants.length > 0) {
      console.log('itemToUpdate', itemToUpdate);
      for (const variantPayload of body.variants) {
        const variantToUpdate = itemVariants.find(
          (v) => v.unique_code === variantPayload.unique_code,
        );
        if (variantToUpdate) {
          console.log('variantToUpdate', variantToUpdate);
          variantToUpdate.size = variantPayload.size;
          variantToUpdate.price = variantPayload.price;
          variantToUpdate.stock = variantPayload.stock;
          const colors = variantToUpdate.colorId;
          delete variantToUpdate.colorId;
          await this.itemVariantsRep.update(
            variantToUpdate.id,
            variantToUpdate,
          );

          if (variantPayload.colors && variantPayload.colors.length > 0) {
            for (const colorPayload of variantPayload.colors) {
              const colorToUpdate = colors.find(
                (c) => c.unique_code === colorPayload.unique_code,
              );
              if (colorToUpdate) {
                console.log('colorToUpdate', colorToUpdate);
                colorToUpdate.color = colorPayload.color;
                colorToUpdate.type = colorPayload.type;
                await this.itemColorsRep.update(
                  colorToUpdate.id,
                  colorToUpdate,
                );
              }
            }
          }
        }
      }
    }

    const updatedItem = await this.itemsRep.update(id, itemToUpdate);
    const finalUpdatedItem: any = await this.findOne(id);
    return finalUpdatedItem;
  }

  async findAll(): Promise<items[]> {
    return await this.itemsRep.findAll({
      where: {
        deleted_at: false,
      },
      include: {
        category_id: true,
        variantId: {
          include: {
            colorId: true,
          },
        },
      },
    });
  }

  async findOne(id: string): Promise<items> {
    const data = await this.itemsRep.findOne({
      where: {
        id: id,
        deleted_at: false,
      },
      include: {
        category_id: true,
        variantId: {
          include: {
            colorId: true,
          },
        },
      },
    });

    if (!data) {
      throw new HttpException('Item not found', HttpStatus.BAD_REQUEST);
    }

    return data;
  }

  async findItemsWithoutDiscount(): Promise<items[]> {
    // const itemsWithoutDiscount = await this.itemsRepository
    //   .createQueryBuilder('items')
    //   .leftJoin('discount_items', 'di', 'items.id = di.itemsId')
    //   .where('di.itemsId IS NULL') // Exclude items that have discounts associated with them
    //   .getRawMany();

    return [];
  }

  // async update(id: number, body: ItemDto): Promise<Items> {
  //   return `This action updates a #${id} item`;
  // }

  async remove(id: string): Promise<items> {
    const itemData = await this.findOne(id);
    if (!itemData) {
      throw 'Item not found!';
    }

    await this.itemsRep.softDelete(id);
    itemData.deleted_at = true;

    return itemData;
  }
}
