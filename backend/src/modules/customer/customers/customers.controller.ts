import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Res,
  } from '@nestjs/common';
  
  import { Response } from 'express';
  import { CustomersService } from './customers.service';
  import {
    CustomerAddressDto,
    CustomerDto,
    CustomerLoginDto,
  } from './dto/customer.request.dto';
  import {  customer_address, cart } from '@prisma/client';
  import { PostgreStatusCode } from 'src/common/enums/enums';
  
  import { CustomerAddressEndpoints, CustomerEndpoints } from './endpoints';
  
  import { ApiTags } from '@nestjs/swagger';
  import { ApiResponseTags } from 'src/common/helper/decorators/api-response-tags.decorator';
  import { CustomerResponseDto } from './dto/customer.request.dto';
  
  
  @ApiTags('Customers')
  @ApiResponseTags()
  @Controller('customers')
  export class CustomersController {
    constructor(private readonly customersService: CustomersService) {}
  
    // Customer Endpoints
    // @Post(CustomerEndpoints.createCustomer)
    // async create(@Res() response: Response, @Body() body: CustomerDto) {
    //   try {
    //     const data: customers = await this.customersService.create(body);
    //     response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    //   } catch (error) {
    //     response
    //       .status(PostgreStatusCode.AUTHORIZATION_ERROR)
    //       .send({ error: true, message: error });
    //   }
    // }
  
    // @Get(CustomerEndpoints.getAllCustomers)
    // async findAll(@Res() response: Response) {
    //   try {
    //     const data: customers[] = await this.customersService.findAll();
    //     response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    //   } catch (error) {
    //     response
    //       .status(PostgreStatusCode.AUTHORIZATION_ERROR)
    //       .send({ error: true, message: error });
    //   }
    // }
    // @Post(CustomerEndpoints.login)
    // async login(@Res() response: Response, @Body() body: CustomerLoginDto) {
    //   try {
    //     const data: CustomerResponseDto = await this.customersService.login(body);
    //     response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    //   } catch (error) {
    //     response
    //       .status(PostgreStatusCode.AUTHORIZATION_ERROR)
    //       .send({ error: true, message: error });
    //   }
    // }
  
    // @Get(CustomerAddressEndpoints.getAllAddresss)
    // async findAllAddress(@Res() response: Response) {
    //   try {
    //     const data: customer_address[] =
    //       await this.customersService.findAllAddress();
    //     response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    //   } catch (error) {
    //     response
    //       .status(PostgreStatusCode.AUTHORIZATION_ERROR)
    //       .send({ error: true, message: error });
    //   }
    // }
  
  
    // @Get(CustomerEndpoints.getCustomer)
    // async findOne(@Res() response: Response, @Param('id') id: string) {
    //   try {
    //     const data: customers = await this.customersService.findOne(id);
    //     response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    //   } catch (error) {
    //     response
    //       .status(PostgreStatusCode.AUTHORIZATION_ERROR)
    //       .send({ error: true, message: error });
    //   }
    // }
  
    // @Patch(CustomerEndpoints.updateCustomer)
    // async update(
    //   @Res() response: Response,
    //   @Param('id') id: string,
    //   @Body() body: CustomerDto,
    // ) {
    //   try {
    //     const data: customers = await this.customersService.update(id, body);
    //     response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    //   } catch (error) {
    //     response
    //       .status(PostgreStatusCode.AUTHORIZATION_ERROR)
    //       .send({ error: true, message: error });
    //   }
    // }
  
    // @Delete(CustomerEndpoints.deleteCustomer)
    // async remove(@Res() response: Response, @Param('id') id: string) {
    //   try {
    //     const data: customers = await this.customersService.remove(id);
    //     response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    //   } catch (error) {
    //     response
    //       .status(PostgreStatusCode.AUTHORIZATION_ERROR)
    //       .send({ error: true, message: error });
    //   }
    // }
  
    // Customer Address Endpoints
    @Post(CustomerAddressEndpoints.createAddress)
    async createAddress(
      @Res() response: Response,
      @Body() body: CustomerAddressDto,
    ) {
      try {
        const data: customer_address =
          await this.customersService.createAddress(body);
        response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
      } catch (error) {
        response
          .status(PostgreStatusCode.AUTHORIZATION_ERROR)
          .send({ error: true, message: error });
      }
    }
  
    
    @Get(CustomerAddressEndpoints.getAddress)
    async findOneAddress(@Res() response: Response, @Param('id') id: string) {
      try {
        const data: customer_address =
          await this.customersService.findOneAddress(id);
        response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
      } catch (error) {
        response
          .status(PostgreStatusCode.AUTHORIZATION_ERROR)
          .send({ error: true, message: error });
      }
    }
  
    @Patch(CustomerAddressEndpoints.updateAddress)
    async updateAddress(
      @Res() response: Response,
      @Param('id') id: string,
      @Body() body: CustomerAddressDto,
    ) {
      try {
        const data: customer_address = await this.customersService.updateAddress(
          id,
          body,
        );
        response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
      } catch (error) {
        response
          .status(PostgreStatusCode.AUTHORIZATION_ERROR)
          .send({ error: true, message: error });
      }
    }
  
    @Delete(CustomerAddressEndpoints.deleteAddress)
    async removeAddress(@Res() response: Response, @Param('id') id: string) {
      try {
        const data: customer_address =
          await this.customersService.removeAddress(id);
        response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
      } catch (error) {
        response
          .status(PostgreStatusCode.AUTHORIZATION_ERROR)
          .send({ error: true, message: error });
      }
    }
  
    @Get(CustomerEndpoints.googleMapSearch)
    async findGoogleAddress(
      @Res() response: Response,
      @Param('text') text: string,
    ) {
      try {
        const data: any = await this.customersService.findGoogleAddress(text);
        response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
      } catch (error) {
        response
          .status(PostgreStatusCode.AUTHORIZATION_ERROR)
          .send({ error: true, message: error });
      }
    }
  }
  