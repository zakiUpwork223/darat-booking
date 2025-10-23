import { Controller, Post, Body, Res, Get, Param, Patch } from '@nestjs/common';
import { Response } from 'express';
import { OrdersService } from './orders.service';
import { OrderDto } from './dto/create-order.dto';
import { PostgreStatusCode } from 'src/common/enums/enums';
import { AdminOrderEndpoints, OrderEndpoints } from './endpoints';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponseTags } from 'src/common/helper/decorators/api-response-tags.decorator';

@ApiTags('Orders')
@ApiResponseTags()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post(OrderEndpoints.createOrder)
  async create(@Res() response: Response, @Body() body: OrderDto) {
    try {
      const data = await this.ordersService.create(body);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }

  @Get(OrderEndpoints.getCustomerOrders)
  async getCustomerOrders(
    @Res() response: Response,
    @Param('customerId') customerId: number,
  ) {
    try {
      const data = await this.ordersService.getCustomerOrders(customerId);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }

  @Get(AdminOrderEndpoints.orderDetails)
  async orderDetails(
    @Res() response: Response,
    @Param('orderId') orderId: string,
  ) {
    try {
      const data = await this.ordersService.findOne(orderId);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }

  @Patch(AdminOrderEndpoints.orderDetails)
  async updateOrder(
    @Res() response: Response,
    @Param('orderId') orderId: string,
    @Param('status') status: string,
  ) {
    try {
      const data = await this.ordersService.updateOrder(orderId, status);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }

  @Post(OrderEndpoints.paymentIntentVerification)
  async PaymentIntentVerification(
    @Res() response: Response,
    @Body() body: any,
  ) {
    try {
      const data = await this.ordersService.PaymentIntentVerification(body);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }
}
