// Nest JS Imports
import { BadRequestException, Injectable } from '@nestjs/common';

// Package Imports
import { config } from 'dotenv';
import Stripe from 'stripe';

config();

@Injectable()
export class StripeService {
  private SecretStripe;
  private PublicStripe;
  private testCard_3D_Secure = '4000 0027 6000 3184';
  private testCard_Simple = '4242 4242 4242 4242';

  constructor() {
    this.SecretStripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });

    this.PublicStripe = new Stripe(process.env.STRIPE_PUBLIC_KEY, {
      apiVersion: '2023-10-16',
    });
  }

  // Create Stripe Token (Dummy Card)
  async createToken() {
    try {
      return await this.PublicStripe.tokens.create({
        card: {
          number: this.testCard_Simple,
          exp_month: 1,
          exp_year: 2024,
          cvc: '314',
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createStripeCustomer(user, stripe_token) {
    try {
      const customer = await this.SecretStripe.customers.create({
        name: user.name,
        email: user.phone ?? user.email,
        source: stripe_token,
      });
      return customer;
    } catch (error) {
      throw new Error('Error creating Stripe customer');
    }
  }

  async customerStripe(customer, stripeToken) {
    const isPreviousCustomer = customer.stripe_customer_key ? true : false;

    if (!isPreviousCustomer) {
      const phoneEmail = customer.phone ? customer.phone : customer.email;
      const customerPayload = {
        name: customer.name,
        email: phoneEmail,
      };
      const stripeCustomer = await this.createStripeCustomer(
        customerPayload,
        stripeToken.id,
      );
      return stripeCustomer?.id;
    } else {
      return customer?.stripe_customer_key;
    }
  }

  // Create Payment Method
  async createPaymentMethod(token) {
    try {
      const paymentMethod = await this.PublicStripe.paymentMethods.create({
        type: 'card',
        card: {
          token: token.id,
        },
      });

      return paymentMethod;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Create Payment Intent
  async paymentIntent(paymentIntentDto) {
    try {
      const { amount, currency, customer, order, stripeCustomerKey } =
        paymentIntentDto;

      const paymentIntent = await this.SecretStripe.paymentIntents.create({
        // create a payment intent
        amount: amount * 100,
        currency: currency,
        receipt_email: customer.phone ?? customer.email,
        customer: stripeCustomerKey,
        confirm: true,
        payment_method_types: ['card'],
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          amount: amount * 100,
          customer: customer.id,
          order: order.id,
        },
      });
      return {
        paymentIntent: paymentIntent,
        client_secret: paymentIntent.client_secret,
      };
    } catch (error) {
      throw error;
    }
  }

  async refundPaymentIntent(paymentIntentId, amountToRefund) {
    try {
      const refund = await this.SecretStripe.refunds.create({
        payment_intent: paymentIntentId,
        amount: amountToRefund, // Amount to refund in cents/pence
        reason: 'order cancelled or failed', // Optional reason for the refund
      });

      return refund;
    } catch (error) {
      console.error('Error refunding payment intent:', error);
      throw error;
    }
  }

  async statusRetrieve(paymentIntentId) {
    try {
      const intent =
        await this.SecretStripe.paymentIntents.retrieve(paymentIntentId);
      return intent;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getInforCustomer(customerId) {
    try {
      const customer = await this.SecretStripe.customers.retrieve(customerId);
      return customer;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
