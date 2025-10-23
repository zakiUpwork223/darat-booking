// // import { Cache } from 'cache-manager';

// export class BaseService<T> {
//   private entityName: string;
//   constructor(
//     entityName: string,
//   ) {
//     this.entityName = entityName;
//   }

//   async findAll(opts?): Promise<T[]> {
//     const data = await this.repo.find(opts);
//     return data;
//   }

//   async findOne(opts?): Promise<T> {
//     return this.repo.findOne(opts);
//   }

//   async findByIds(itemIds): Promise<T[]> {
//     const data = await this.repo.findByIds(itemIds);
//     return data;
//   }

//   async save(payload, relations?): Promise<T> {
//     const data = await this.repo.save(payload, relations);
//     return data;
//   }

//   async update(id: number, payload): Promise<T> {
//     const data = await this.repo.update(id, payload);
//     return data;
//   }

//   async delete(id): Promise<T> {
//     return this.repo.delete(id);
//   }

//   async softDelete(id): Promise<T> {
//     return this.repo.softDelete(id);
//   }

//   async Count(): Promise<T> {
//     return this.repo.count();
//   }
// }


import { PrismaClient } from '@prisma/client';

export class BaseService<T> {
  protected prisma: PrismaClient;
  protected entityName: string;

  constructor(prisma: PrismaClient, entityName: string) {
    this.prisma = prisma;
    this.entityName = entityName;
  }

  async findAll(opts?): Promise<T[]> {
    return this.prisma[this.entityName].findMany(opts);
  }

  async findOne(opts?): Promise<T | null> {
    return this.prisma[this.entityName].findFirst(opts);
  }

  async findByIds(itemIds: string[]): Promise<T[]> {
    return this.prisma[this.entityName].findMany({
      where: { id: { in: itemIds } },
    });
  }

  async save(payload: any): Promise<T> {
    return this.prisma[this.entityName].create({
      data: payload,
    });
  }

  async update(id: string, payload: any): Promise<T> {
    return this.prisma[this.entityName].update({
      where: { id },
      data: payload,
    });
  }

  async delete(id: string): Promise<T> {
    return this.prisma[this.entityName].delete({
      where: { id },
    });
  }

  async softDelete(id: string): Promise<T> {
    return this.prisma[this.entityName].update({
      where: { id },
      data: { deleted_at: true }, // Assuming your schema has a 'deleted' field
    });
  }

  async count(): Promise<number> {
    return this.prisma[this.entityName].count();
  }
}
