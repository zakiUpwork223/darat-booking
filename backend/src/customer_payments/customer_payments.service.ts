import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCustomerPaymentDto } from './dto/create-customer_payment.dto';
import { UpdateCustomerPaymentDto } from './dto/update-customer_payment.dto';
import { RequestUser } from 'src/auth/entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomerPaymentsService {
  constructor(
    private prismaService: PrismaService,
  ) { }
  async createAppointmentReceipt(createCustomerPaymentDto: CreateCustomerPaymentDto) {
    try {
      const createPayment = await this.prismaService.customerPaymentsRecord.create({
        data: {
          stripeCustomer: createCustomerPaymentDto.stripeId,
          client_secret: createCustomerPaymentDto.client_secret,
          paymentAmount: createCustomerPaymentDto.paymentAmount,
          type: createCustomerPaymentDto.type,
          appointment:createCustomerPaymentDto.appointmentId
        }
      })

      return createPayment;
    } catch (error) {
      throw new InternalServerErrorException(`Error occured while creating Payment ${error.message}`)
    }
  }

  findAll() {
    return `This action returns all customerPayments`;
  }

  async findOneByStripeId(id: string) {
   try {
    const patientData = await this.prismaService.stripeCustomer.findUnique({
      where:{
        stripeCutomerId:id
      }
    })

    if(!patientData){
      throw new NotFoundException("Patient not found according to Stripe Id")
    }

    return patientData
   } catch (error) {
    throw error
    
   }
  }

  update(id: number, updateCustomerPaymentDto: UpdateCustomerPaymentDto) {
    return `This action updates a #${id} customerPayment`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerPayment`;
  }
}
