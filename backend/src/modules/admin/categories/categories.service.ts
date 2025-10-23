import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryDto, UpdateCategoryDto } from './dto/category.request.dto';
import { BaseService } from 'src/common/services/base-service';
import ShortUniqueId from 'short-unique-id';
import { categories } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  private categoriesRep: BaseService<categories>;

  constructor(
    private prismaService: PrismaService, // Inject the PrismaService
  ) {
    this.categoriesRep = new BaseService<categories>(
      this.prismaService,
      'categories',
    );
  }

  async create(body: CategoryDto): Promise<categories> {
    const otpGenerator = new ShortUniqueId({ length: 8 });
    const unique_code = otpGenerator.randomUUID(8);
    Object.assign(body, { unique_code });
    return await this.categoriesRep.save(body);
  }

  async findAll(): Promise<categories[]> {
    return await this.categoriesRep.findAll({
      where: {
        deleted_at: false
      }
    });
  }

  async findOne(id: string): Promise<categories> {
    const category = await this.categoriesRep.findOne({
      where: {
        id,
        deleted_at: false
      },
    });

    if(!category) {
      throw new HttpException('Category not found', HttpStatus.BAD_GATEWAY);
    }

    return category;
  }
  async findCategoriesWithoutDiscount(): Promise<categories[]> {
    // const categoriesWithoutDiscount = await this.categoriesRepository
    //   .createQueryBuilder('categories')
    //   .leftJoin('discount_categories', 'di', 'categories.id = di.categoriesId')
    //   .where('di.categoriesId IS NULL') // Exclude items that have discounts associated with them
    //   .getRawMany();
    

    return [];
  }
  async update(id: string, body: UpdateCategoryDto): Promise<categories> {
    await this.categoriesRep.update(id, body);
    return await this.findOne(id);
  }

  async remove(id: string): Promise<categories> {
    const data = await this.findOne(id);
    if (!data) {
      throw 'Category not Found!';
    }

    return await this.categoriesRep.softDelete(id);
  }
}
