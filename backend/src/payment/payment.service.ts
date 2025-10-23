import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import Stripe from 'stripe'
import { PrismaService } from 'src/prisma/prisma.service';
import { PatientService } from 'src/patient/patient.service';
import { RequestUser } from 'src/auth/entities/user.entity';
import { WebsocketGateway } from 'src/sockets/websocket.gateway';
import { CustomerPaymentsService } from 'src/customer_payments/customer_payments.service';
import { receiptData } from './entities/payment.entity';
import { PaymentIntentDto } from './dto/payment-intent.dto';
import { AppointmentService } from 'src/appointment/appointment.service';
import { LoyaltyService } from 'src/loyalty/loyalty.service';

@Injectable()
export class PaymentService {
  private StripeSecret
  private StripePublic
  constructor(
    private prismaService: PrismaService,
    private patientService: PatientService,
    private socketService: WebsocketGateway,
    private customerPaymentService: CustomerPaymentsService,
    private appointmentService: AppointmentService,
    private loyaltyService: LoyaltyService,
  ) {
    this.StripeSecret = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    })

    this.StripePublic = new Stripe(process.env.STRIPE_PUBLIC_KEY, {
      apiVersion: '2023-10-16',
    })
  }



  async paymentIntent(paymentIntentDto: PaymentIntentDto, user: RequestUser,) {
    try {
      const { amount, currency, ...restdata } = paymentIntentDto
      console.log(paymentIntentDto.scheduldedDate);

      await this.appointmentService.checkBookingSlotAndData(restdata)

      const customerStripe = await this.customerStripe(user) // for stroing patient info as cutomer on stripe and in DB

      const scheduledDate = new Date(paymentIntentDto.scheduldedDate).toISOString();
      const paymentIntent = await this.StripeSecret.paymentIntents.create({ // create a payment intent 
        amount: amount * 100,
        currency: currency,
        customer: customerStripe.stripeCutomerId,
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          doctorId: paymentIntentDto.doctorId,
          serviceId: paymentIntentDto.serviceId,
          scheduldedDate: scheduledDate
        },
      })
      //return paymentIntent
      return { client_secret: paymentIntent.client_secret } // only client secret to be sent to FE which will thwn proceed with payment using publishbable key
    } catch (error) {
      throw error
    }

  }
  async retrievePaymentIntent(client_secret: string) { // using client secret to retrieve intent id // used in loyalty
    try {
      // console.log(client_secret)
      const intent1 = client_secret.split("_")[0]
      const intent2 = client_secret.split("_")[1]
      const intent = intent1 + "_" + intent2
      // console.log("intent", intent);

      const paymentIntent = await this.StripeSecret.paymentIntents.retrieve(
        intent
      );

      return paymentIntent
    } catch (error) {
      throw error
    }
  }

  async retrieveCustomerWilthTheirPaymentIntent(customerId: string) { // to retrieve all payment intents of a user using customer id . customer id is stored in DB as well if user has done any previous transaction
    try {
      const paymentIntent = await this.StripeSecret.paymentIntents.list({
        customer: customerId
      }
      );

      return paymentIntent
    } catch (error) {
      throw error
    }
  }

  async createCustomer(name: string, email: string) { // create a customer on stripe using name and email //carefull to use it and check if user is part of db or not
    try {
      const userOnStipe = await this.StripeSecret.customers.create({
        name: name,
        email: email
      })
      return userOnStipe
    } catch (error) {
      throw error
    }
  }

  async retrieveCustomer(customerId: string) { // retrieve customer from stripe using customer Id(stored in db)
    try {
      const userOnStipe = await this.StripeSecret.customers.retrieve(
        customerId
      )
      return userOnStipe
    } catch (error) {
      throw error
    }
  }

  async customerStripe(user: RequestUser) {
    const patientData = await this.patientService.findOnePatientByID(user.id) // check if patient exists in db , // no need if using jwt guard
    const isPreviousCustomer = await this.prismaService.stripeCustomer.findUnique({ //if already a previous cutomer than this user is registered as customer in stripe and also db
      where: {
        patient: user.id
      }
    })
    if (isPreviousCustomer) { // return old data
      return isPreviousCustomer;
    }

    const stripeCustomer = await this.createCustomer(patientData.name, patientData.email) // if not previous customer, create customer on stripe
    const paymentCustomer = await this.prismaService.stripeCustomer.create({ // if not previous customer, create customer on payment
      data: {
        patient: user.id,
        stripeCutomerId: stripeCustomer.id
      }
    })

    return paymentCustomer;
  }

  async ephemeralKey() {
    try {
      //const customer = await this.StripeSecret.customers.create();
      const ephemeralKey = await this.StripeSecret.ephemeralKeys.create(
        { customer: "cus_PfxwoSfDvxgbO9" },
        { apiVersion: '2023-10-16' }
      );
      return ephemeralKey;
    } catch (error) {
      throw error
    }
  }

  async handleEvent(body: any) {
    let event;

    try {
      console.log("inside ");
    } catch (err) {
      console.error(err.message)
      throw new Error(`Webhook Error: ${err.message}`);
    }

    switch (body.type) {
      case 'payment_intent.succeeded':
        try {
          const customerId = body.data.object.customer
          const user = await this.customerPaymentService.findOneByStripeId(body.data.object.customer)
          const rawBookingData = body.data.object.metadata
          const scheduledDate = new Date(rawBookingData.scheduldedDate);
          const bookingData = { ...rawBookingData, scheduldedDate: scheduledDate }

          const payload = await this.appointmentService.checkBookingSlotAndData(bookingData)

          const createBooking = await this.appointmentService.createBooking(payload, user.patient)
          const receiptData: receiptData = {
            stripeId: body.data.object.customer,
            client_secret: body.data.object.client_secret,
            paymentAmount: body.data.object.amount,
            type: "booking",
            appointmentId:createBooking.id
          }
          console.log(user.patient)
          const patientPoints = await this.loyaltyService.createPoints(body.data.object.amount, user)

          await this.socketService.paymentStatus(user.patient, "Your Payment has been received")
          await this.customerPaymentService.createAppointmentReceipt(receiptData) //@todo create receipt
          // Call a function to handle the event payment_intent.succeeded
        } catch (error) {
          console.error(error.message)
          throw error

        }
        break;
      case 'payment_intent.created':
        console.log("created intent");

        //const data = { 1: "ali", 2: "Shazada" }
        const customerId = body.data.object.customer
        // const userInfo = await this.prismaService.stripeCustomer.findUnique({
        //   where: {
        //     stripeCutomerId: customerId
        //   },
        //   include: {
        //     patientId: {
        //       select: {
        //         name: true
        //       }
        //     }
        //   }
        // })
        // console.log("userInfo : ", userInfo, "\n");
        // console.log("event body \n :  ", body);

        const user = await this.customerPaymentService.findOneByStripeId(body.data.object.customer)
        const rawBookingData = body.data.object.metadata
        const scheduledDate = new Date(rawBookingData.scheduldedDate);
        console.log("scheduledDate : ", scheduledDate);


        const bookingData = { ...rawBookingData, scheduldedDate: scheduledDate }

        console.log("this is the booking data : ", bookingData);
        console.log("\nuser : ", user)
        const payload = await this.appointmentService.checkBookingSlotAndData(bookingData)
        await this.socketService.appointmentStatus(user.patient, "slot checked for user")//remove
        const createBooking = await this.appointmentService.createBooking(payload, user.patient)
        await this.socketService.appointmentStatus(user.patient, "booking done for user")
        const receiptData: receiptData = {
          stripeId: body.data.object.customer,
          client_secret: body.data.object.client_secret,
          paymentAmount: body.data.object.amount,
          type: "booking",
          appointmentId:createBooking.id
        }
        console.log(user.patient)

        await this.socketService.appointmentStatus(user.patient, "Payment Received for user")
        //await this.customerPaymentService.create(receiptData)

        //console.log(userInfo.patient);

        // this.socketService.sendMessage(userInfo.patient, `payment intent created for user ${userInfo.patientId.name}`)
        // const receiptData: receiptData = {
        //   stripeId: body.data.object.customer,
        //   client_secret: body.data.object.client_secret,
        //   paymentAmount: body.data.object.amount,
        //   type: "booking"
        // }
        //await this.customerPaymentService.create(receiptData)
        //const paymentIntentCreated = event.data.object;
        // Call a function to handle the event payment_intent.succeeded

        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }





  // {
  //   id: 'evt_3Orh2pAkgx2dwH371llJeHqW',
  //   object: 'event',
  //   api_version: '2023-10-16',
  //   created: 1709818295,
  //   data: {
  //     object: {
  //       id: 'pi_3Orh2pAkgx2dwH3712SGtmyF',
  //       object: 'payment_intent',
  //       amount: 7860000,
  //       amount_capturable: 0,
  //       amount_details: [Object],
  //       amount_received: 0,
  //       application: null,
  //       application_fee_amount: null,
  //       automatic_payment_methods: [Object],
  //       canceled_at: null,
  //       cancellation_reason: null,
  //       capture_method: 'automatic',
  //       client_secret: 'pi_3Orh2pAkgx2dwH3712SGtmyF_secret_xenxjyDKIgw6DBqpohZxoRb9N',
  //       confirmation_method: 'automatic',
  //       created: 1709818295,
  //       currency: 'sar',
  //       customer: 'cus_PgjhayW8mV1AT4',
  //       description: null,
  //       invoice: null,
  //       last_payment_error: null,
  //       latest_charge: null,
  //       livemode: false,
  //       metadata: {},
  //       next_action: null,
  //       on_behalf_of: null,
  //       payment_method: null,
  //       payment_method_configuration_details: [Object],
  //       payment_method_options: [Object],
  //       payment_method_types: [Array],
  //       processing: null,
  //       receipt_email: null,
  //       review: null,
  //       setup_future_usage: null,
  //       shipping: null,
  //       source: null,
  //       statement_descriptor: null,
  //       statement_descriptor_suffix: null,
  //       status: 'requires_payment_method',
  //       transfer_data: null,
  //       transfer_group: null
  //     }
  //   },
  //   livemode: false,
  //   pending_webhooks: 3,
  //   request: {
  //     id: 'req_PMObZBmiasr8Fb',
  //     idempotency_key: 'stripe-node-retry-14a14d1b-ac59-4b35-9a45-330a439a147d'
  //   },
  //   type: 'payment_intent.created'
  // }

}
