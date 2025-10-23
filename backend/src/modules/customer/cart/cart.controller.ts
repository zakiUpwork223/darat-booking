import { Controller, Post, Body, Res, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';
import { CartService } from './cart.service';
import { CartDto, CustomerCartDto, RemoveCartItemDto } from './dto/create-cart.dto';
import { CartEndpoints } from './endpoints';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponseTags } from 'src/common/helper/decorators/api-response-tags.decorator';
import { PostgreStatusCode } from 'src/common/enums/enums';

@ApiTags('Cart')
@ApiResponseTags()
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post(CartEndpoints.updateCart)
  async updateCart(@Res() response: Response, @Body() body: CartDto) {
    try {
      const data = await this.cartService.updateCart(body);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      console.error(`${error.message}`)
      throw new InternalServerErrorException(`\n error : ${error.message} ` )
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }

  @Post(CartEndpoints.removeCartItem)
  async removeCartItem(@Res() response: Response, @Body() body: RemoveCartItemDto) {
    try {
      const data = await this.cartService.removeCartItem(body);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      console.error(`${error.message}`)
      throw new InternalServerErrorException(`\n error : ${error.message} ` )
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }

  @Post(CartEndpoints.getCart)
  async getCart(@Res() response: Response, @Body() body: CustomerCartDto) {
    try {
    
      const data = await this.cartService.getCart(body);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
       
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }

  
}
