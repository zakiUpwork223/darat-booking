import { Injectable } from '@nestjs/common';

import { BaseService } from 'src/common/services/base-service';
import { categories, item_colors, item_variants, items } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MenuService {
    private itemsRep: BaseService<items>;
    private itemVariantsRep: BaseService<item_variants>;
    private itemColorsRep: BaseService<item_colors>;
    private categoriesRep: BaseService<categories>;
    constructor(
        private prismaService: PrismaService,
    ) {
        this.itemsRep = new BaseService<items>(
            this.prismaService,
            'items',
        );

        this.itemVariantsRep = new BaseService<item_variants>(
            this.prismaService,
            'item_variants',
        );

        this.itemColorsRep = new BaseService<item_colors>(
            this.prismaService,
            'item_colors',
        );

        this.categoriesRep = new BaseService<categories>(
            this.prismaService,
            'categories',
        );
    }

    async getAllCategories() {
        return await this.categoriesRep.findAll({
            where: {
                active: true,
                deleted_at: false
            },
        });
    }

    async getAllItems() {
        return await this.prismaService.items.findMany({
            where: {
                category_id: {
                    active: true,
                },
                deleted_at: false
            },
            include: {
                category_id: true,
                variantId: true,
                discounts: {
                    include: {
                        discount: true
                    },
                    where: {
                        discount: {
                            deleted_at: false
                        }
                    }
                },
            },
        });
    }
    

    async getItem(id: string) {
        return await this.itemsRep.findOne({
            where: {
                id,
                category_id: {
                    active: true,
                },
            },
            include: {
                category_id: true,
                variantId: {
                    include: {
                        colorId: true,
                    }
                },
                discounts: true
            }
        });
    }
}
