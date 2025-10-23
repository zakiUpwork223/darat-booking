import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/create-order.dto';
import { BaseService } from 'src/common/services/base-service';
import Stripe from 'stripe';
import { StripeService } from 'src/common/services/stripe.service';
import { OrderStatusEnums } from 'src/common/enums/enums';
import {  order_items, orders } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PatientService } from 'src/patient/patient.service';

@Injectable()
export class OrdersService {
  private ordersRep: BaseService<orders>;
  private orderItemsRep: BaseService<order_items>;
  //private customerRep: BaseService<customers>;
  // private patientService: PatientService
  private StripeSecret;
  private StripePublic;
  constructor(
    private prismaService: PrismaService,
    private stripeService: StripeService,
    private patientService: PatientService
  ) {
    this.ordersRep = new BaseService<orders>(
      this.prismaService,
      "orders",
    );

    this.orderItemsRep = new BaseService<order_items>(
      this.prismaService,
      "order_items",
    );

    // this.customerRep = new BaseService<customers>(
    //   this.prismaService,
    //   "customers",
    // );

    this.StripeSecret = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });

    this.StripePublic = new Stripe(process.env.STRIPE_PUBLIC_KEY, {
      apiVersion: '2023-10-16',
    });
  }

  async create(body: OrderDto) {
    const { items, stripeToken, ...rest } = body;
    const stripe_token =
      stripeToken || (await this.stripeService.createToken());
    const customerId = rest.customer_id;
    const customer = await this.patientService.findOnePatientByID(customerId);

    if (!customer) {
      throw 'customer not found';
    }

    const stripeCustomerKey = await this.stripeService.customerStripe(
      customer,
      stripe_token,
    );

    await this.prismaService.patient.update({
      where: { id: customer.id }, 
      data: {
      stripe_customer_key: stripeCustomerKey,
    }});

    const order = await this.ordersRep.save(rest);

    if (!order) {
      throw 'Order not saved';
    }

    const orderItems = items.map((item) => {
      return {
        ...item,
        orderId: order.id,
      };
    });

    await this.orderItemsRep.save(orderItems);
    const intent = await this.stripeService.paymentIntent({
      amount: body.totalPrice,
      currency: 'SAR',
      customer,
      order,
      stripeCustomerKey,
    });

    if (!intent) {
      await this.ordersRep.update(order.id, {
        status: OrderStatusEnums.CANCELLED,
      });
      throw 'Payment Unsuccessfull';
    }

    await this.ordersRep.update(order.id, {
      paymentIntentId: intent.paymentIntent.id,
    });

    return { order, intent };
  }

  async getCustomerOrders(customer_id: number) {
    return await this.ordersRep.findAll({
      where: {
        customer_id,
      },
      include: {
        orderItems: {
          include: {
            variant_id: true,
            colorId: true,
          }
        }
      }
    });
  }

  async findOne(id: string) {
    return await this.ordersRep.findOne({
      where: {
        id,
      },
      include: {
        orderItems: {
          include: {
            variant_id: true,
            colorId: true,
          }
        }
      }
    });
  }

  async updateOrder(id: string, status: string) {
    await this.ordersRep.update(id, { status });
    if (status === OrderStatusEnums.CANCELLED) {
      const order = await this.ordersRep.findOne({
        where: {
          id,
        },
      });
      const refund = await this.stripeService.refundPaymentIntent(
        order.paymentIntentId,
        order.totalPrice,
      );
      if (refund) {
        await this.ordersRep.update(id, { refundId: refund.id });
      }
    }
    return await this.findOne(id);
  }

  async PaymentIntentVerification(body: any) {
    if (
      body.type === 'payment_intent.canceled' ||
      body.type === 'payment_intent.payment_failed'
    ) {
      const data = body.metadata;
      if (data) {
        await this.ordersRep.update(data.order, {
          status: OrderStatusEnums.CANCELLED,
        });
        return data;
      } else {
        throw 'Some Payment Error Occured';
      }
    } else {
      return 'Payment Successfull';
    }
  }
}
