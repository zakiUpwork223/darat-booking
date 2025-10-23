import { Injectable } from '@nestjs/common';
import { SearchDto } from './dto/search.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async search(query: string) {
    const doctors = await this.prisma.doctor.findMany({
      where: {
        OR: [
          { name: { startsWith: query, mode: 'insensitive' } },
          { name: { contains: query, mode: 'insensitive' } },
          {
            specialization: {
              OR: [
                { name: { startsWith: query, mode: 'insensitive' } },
                { name: { contains: query, mode: 'insensitive' } },
              ],
            },
          },
        ],
      },
    });

    const services = await this.prisma.service.findMany({
      where: {
        OR: [
          { name: { contains: query , mode: 'insensitive' } },
          { description: { contains: query , mode: 'insensitive' } },
        ],
      },
      include: {
        schedule: true,
        appointment: true,
      },
    });

    const menu = await this.prisma.items.findMany({
      where: {
        OR: [
          { name: { contains: query  , mode: 'insensitive' } },
          { description: { contains: query , mode: 'insensitive' } },
        ],
      },
      include: {
        variantId: true,
        discounts: {
          include:{
            discount:true
          }
        }
      },
    });

    return { doctors, services, menu };
  }
}
