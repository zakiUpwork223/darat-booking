import { Injectable } from '@nestjs/common';
import {
    CancelOrdersReport,
    CustomerOrdersReportDto,
    DashBoardOrders,
    OrdersReportDto,
    SalesReport,
} from './dto/create-reporting.dto';
import { BaseService } from 'src/common/services/base-service';
import { OrderStatusEnums } from 'src/common/enums/enums';
import { order_items, orders } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReportingService {
    private ordersRep: BaseService<orders>;
    private orderItemRep: BaseService<order_items>;
    constructor(
        private prismaService: PrismaService, // Inject the PrismaService
    ) {
        this.ordersRep = new BaseService<orders>(
            this.prismaService,
            'orders',
        );
        this.orderItemRep = new BaseService<order_items>(
            this.prismaService,
            'order_items',
        );
    }

    async ordersReport(body: OrdersReportDto) {
        let where: any = {};
        if (body.status) {
            where.status = body.status;
        }

        if (body.startDate || body.endDate) {
            where.createdAt = {
                gte: body.startDate,
                lte: body.endDate,
            };
        }
        const data = await this.ordersRep.findAll({
            where,
            include: {
                customer_id: true,
                orderItems: true
            }
        });

        return data;
    }

    async customerOrdersReport(body: CustomerOrdersReportDto) {
        let where: any = {
            customer_id: body.customer_id,
        };

        if (body.startDate || body.endDate) {
            where.createdAt = {
                gte: body.startDate,
                lte: body.endDate,
            };
        }
        const data = await this.ordersRep.findAll({
            where,
            include: {
                customer_id: true,
                orderItems: true
            }
        });

        return data;
    }

    async salesReport(body: SalesReport) {
        const where: any = {
            status: {
                in: [OrderStatusEnums.DELIVERED, OrderStatusEnums.PICKED],
            },
        };

        if (body.startDate || body.endDate) {
            where.createdAt = {
                gte: body.startDate,
                lte: body.endDate,
            };
        }

        const totalSalesCount: any = await this.prismaService.order_items.aggregate({
            _sum: {
                price: true,
            },
            where: {
                order_id: where,
            },
        });

        return totalSalesCount._sum.totalPrice;
    }

    async cancelOrdersReport(body: CancelOrdersReport) {
        const where: any = {
            status: OrderStatusEnums.CANCELLED,
        };

        if (body.startDate || body.endDate) {
            where.createdAt = {
                gte: body.startDate,
                lte: body.endDate,
            };
        }

        const data = await this.ordersRep.findAll({
            where,
            include: {
                customer_id: true,
                orderItems: true
            }
        });

        return data;
    }

    async dashboardTotalOrders(body: DashBoardOrders) {
        let where: any = {};

        if (body.startDate || body.endDate) {
            where.createdAt = {
                gte: body.startDate,
                lte: body.endDate,
            };
        }

        const result = await this.prismaService.order_items.aggregate({
            _sum: {
                price: true,
            },
            where: {
                order_id: where,
            },
        });

        return result;
    }

    async dashboardPendingOrders(body: DashBoardOrders) {
        let where: any = {
            status: OrderStatusEnums.PENDING,
        };

        if (body.startDate || body.endDate) {
            where.createdAt = {
                gte: body.startDate,
                lte: body.endDate,
            };
        }

        const result = await this.prismaService.order_items.aggregate({
            _sum: {
                price: true,
            },
            where: {
                order_id: where,
            },
        });

        return result;
    }

    async dashboardCompletedOrders(body: DashBoardOrders) {
        const where: any = {
            status: {
                in: [OrderStatusEnums.DELIVERED, OrderStatusEnums.PICKED],
            },
        };

        if (body.startDate || body.endDate) {
            where.createdAt = {
                gte: body.startDate,
                lte: body.endDate,
            };
        }

        const result = await this.prismaService.order_items.aggregate({
            _sum: {
                price: true,
            },
            where: {
                order_id: where,
            },
        });

        return result;
    }

    async dashboardCancelledOrders(body: DashBoardOrders) {
        const where: any = {
            status: OrderStatusEnums.CANCELLED,
        };

        if (body.startDate || body.endDate) {
            where.createdAt = {
                gte: body.startDate,
                lte: body.endDate,
            };
        }

        const result = await this.prismaService.order_items.aggregate({
            _sum: {
                price: true,
            },
            where: {
                order_id: where
            },
        });

        return result;
    }
}
