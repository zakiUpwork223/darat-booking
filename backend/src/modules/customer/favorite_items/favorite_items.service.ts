import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FavoriteItemDto } from './dto/create_favorite_items.dto';
import { BaseService } from 'src/common/services/base-service';
import { favorite_items, items } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoriteItemsService {
  private itemsRep: BaseService<items>;
  private favoriteItemsRep: BaseService<favorite_items>;
  constructor(private prismaService: PrismaService) {
    this.itemsRep = new BaseService<items>(this.prismaService, 'items');
    this.favoriteItemsRep = new BaseService<favorite_items>(
      this.prismaService,
      'favorite_items',
    );
  }

  async create(body: FavoriteItemDto, userId: string): Promise<any> {
    try {
      console.log("here")
      const { variantId } = body;

      const payloadFavoriteItem = {
        variantId,
        customerId:userId
      };
      const favoriteItemData =
        await this.favoriteItemsRep.save(payloadFavoriteItem);
      const id = favoriteItemData.id;
      const createdFavoriteItem = await this.findOne(id);
      return createdFavoriteItem;
    } catch (error) {
      throw new HttpException(error.message, 403);
    }
  }

  async findUserAllFavoriteItems(userId:string): Promise<favorite_items[]> {
    try {
      return await this.favoriteItemsRep.findAll({
        where: {
          customerId: userId,
          deleted_at: false,
        },
        include: {
          variant_id: {
            include:{
              item_id: true
          }}
        },
      });
    } catch (error) {
      throw new HttpException(error.message, 403);
    }
  }

  async findOne(id: string): Promise<favorite_items> {
    try {
      const data = await this.favoriteItemsRep.findOne({
        where: {
          id: id,
          deleted_at: false,
        },
        include: {
          variant_id: {
            include:{
              item_id: true
          }}
        },
      });

      if (!data) {
        throw new HttpException(
          'Favorite Item not found',
          HttpStatus.BAD_REQUEST,
        );
      }

      return data;
    } catch (error) {
      throw new HttpException(error.message, 403);
    }
  }

  async remove(id: string): Promise<favorite_items> {
    try {
      const favoriteItemData = await this.findOne(id);
      if (!favoriteItemData) {
        throw 'Item not found!';
      }

      await this.favoriteItemsRep.softDelete(id);
      favoriteItemData.deleted_at = true;

      return favoriteItemData;
    } catch (error) {
      throw new HttpException(error.message, 403);
    }
  }
}
