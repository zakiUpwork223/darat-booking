import { Injectable } from '@nestjs/common';
import {
  CustomerAddressDto,
  CustomerDto,
  CustomerLoginDto,
} from './dto/customer.request.dto';
import {  customer_address, cart } from '@prisma/client';
import { BaseService } from 'src/common/services/base-service';
// import * as jwt from 'jsonwebtoken';
// import * as bcrypt from 'bcryptjs';
// import ShortUniqueId from 'short-unique-id';
import { GoogleMapsAPIService } from 'src/common/services/google-map.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomerResponseDto } from './dto/customer.request.dto';

@Injectable()
export class CustomersService {
  //private customersRep: BaseService<customers>;
  private customerAddressRep: BaseService<customer_address>;
  private cartRep: BaseService<cart>;
  constructor(
    private prismaService: PrismaService,
    private googleMapService: GoogleMapsAPIService,
  ) {
    // this.customersRep = new BaseService<customers>(
    //   this.prismaService,
    //   'customers',
    // );
    this.customerAddressRep = new BaseService<customer_address>(
      this.prismaService,
      'customer_address',
    );
    this.cartRep = new BaseService<cart>(this.prismaService, 'cart');
  }

  // Customer Services
  // async create(body: CustomerDto) {
  //   body.password = await bcrypt.hash(body.password, 10);
  //   const customer = await this.customersRep.save(body);

  //   const cart = await this.cartRep.findOne({
  //     where: {
  //       customerId: customer.id,
  //     },
  //   });

  //   if (!cart) {
  //     const otpGenerator = new ShortUniqueId({ length: 8 });
  //     const unique_code = otpGenerator.randomUUID(8);
  //     await this.cartRep.save({ customerId: customer.id, unique_code });
  //   }

  //   return customer;
  // }

  // async findAll() {
  //   return await this.customersRep.findAll();
  // }

  // async findOne(id: string) {
  //   return await this.customersRep.findOne({
  //     where: {
  //       id,
  //     },
  //     include: { address: true },
  //   });
  // }

  // async update(id: string, body: CustomerDto) {
  //   await this.customersRep.update(id, body);
  //   return this.findOne(id);
  // }

  // async remove(id: string) {
  //   const customer = await this.findOne(id);
  //   await this.customersRep.softDelete(id);
  //   return customer;
  // }

  // async login(body: CustomerLoginDto): Promise<CustomerResponseDto> {
  //   const data: customers = await this.customersRep.findOne({
  //     where: { OR: [{ email: body.email }, { phone: body.email }] },
  //     select: {
  //       id: true,
  //       name: true,
  //       email: true,
  //       phone: true,
  //       password: true,
  //     },
  //   });
  //   if (data && !data.deleted_at) {
  //     const { id, name, email, phone } = data;
  //     const authenticated = await bcrypt.compare(body.password, data.password);
  //     if (authenticated) {
  //       const user = {
  //         id,
  //         name,
  //         email,
  //         phone,
  //       };
  //       const token = jwt.sign(user, process.env.JWT_SECRET, {
  //         expiresIn: process.env.JWT_EXPIRATION_TIME,
  //       });
  //       return new CustomerResponseDto(id, name, email, phone, token);
  //     } else {
  //       throw 'Invalid Credentials!';
  //     }
  //   } else {
  //     if (data && data.deleted_at) {
  //       throw 'Your account isnt activated! Please activate your account';
  //     } else {
  //       throw 'Invalid Credentials! User not found.';
  //     }
  //   }
  // }

    // Customer Address Services
    async createAddress(body: CustomerAddressDto) {
      return await this.customerAddressRep.save(body);
    }

    async findAllAddress() {
      return await this.customerAddressRep.findAll({
        include: {customer:true},
      });
    }

    async findOneAddress(id: string) {
      return await this.customerAddressRep.findOne({
        where: {
          id,
        },
        include: {customer:true},
      });
    }

    async updateAddress(id: string, body: CustomerAddressDto) {
      await this.customerAddressRep.update(id, body);
      return this.findOneAddress(id);
    }

    async removeAddress(id: string) {
      const customerAddress = await this.findOneAddress(id);
      await this.customerAddressRep.delete(id);
      return customerAddress;
    }

    // google-map service
    async findGoogleAddress(text: string) {
      return await this.googleMapService.searchPlaces(text);
    }
}
