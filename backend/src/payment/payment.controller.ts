import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, HttpCode , Headers , Logger, Res, HttpStatus} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentIntentDto } from './dto/payment-intent.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { Roles } from 'src/roleGuard/role.decorator';
import { Role } from 'src/roleGuard/role.enum';
import { RolesGuard } from 'src/roleGuard/role.guard';

@Controller('payment')
export class PaymentController {
  private readonly logger = new Logger(PaymentController.name);
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Patient)
  //@Roles(Role.Patient, Role.Admin)
  @Post('paymentIntent')// for FE
  createPayment(@Body() paymentIntentDto: PaymentIntentDto, @Req() req) { 
    return this.paymentService.paymentIntent(paymentIntentDto , req.user);
  }

  @Post('retrievePaymentIntent')// for BE
  retrievePaymentIntent(@Body()request: { intent: string}, @Req() req) { 
    const { intent } = request;
    return this.paymentService.retrievePaymentIntent(intent );
  }

  @Post('retrieveCustomerWithAllPaymentIntent')
  retrieveCustomerWillPaymentIntent(@Body()request: { customerId: string}, @Req() req) {
    const { customerId } = request;
    return this.paymentService.retrieveCustomerWilthTheirPaymentIntent(customerId );
  }

  @Post('createCustomer')
  createCustomer(@Body() request: { email: string; name: string }, @Req() req) {
    const { email, name } = request;
    console.log (request)
    return this.paymentService.createCustomer(name , email);
  }

  @Post('retrieveCustomer')
  retrieveCustomer(@Body() request: { customerId: string }, @Req() req) {
    const { customerId } = request;
    console.log (request)
    return this.paymentService.retrieveCustomer(customerId );
  }

  @Post('ephemeralKey')
  ephemeralKey() {
    return this.paymentService.ephemeralKey( );
  }


  @Post("stripe/payments")
  async handleWebhook(@Body() body: any) {
    try {
      console.log("inside")
      await this.paymentService.handleEvent(body);
    } catch (err) {
      return { error: `Webhook Error: ${err.message}` };
    }
  }

}
