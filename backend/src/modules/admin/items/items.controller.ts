import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  Res,
  NotFoundException,
  Patch,
} from '@nestjs/common';

import { Response } from 'express';

import { ItemsService } from './items.service';
import { ItemDto } from './dto/item.request.dto';
import { PostgreStatusCode } from 'src/common/enums/enums';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponseTags } from 'src/common/helper/decorators/api-response-tags.decorator';
import { items } from '@prisma/client';

@ApiTags('Items')
@ApiResponseTags()
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async create(@Res() response: Response, @Body() body: ItemDto) {
    try {
      const data: items = await this.itemsService.create(body);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }

  @Get('non-discounted-items')
  async findAllWithoutDiscount(@Res() response: Response) {
    try {
      const data: items[] = await this.itemsService.findItemsWithoutDiscount();
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }

  @Get()
  async findAll(@Res() response: Response) {
    try {
      const data: items[] = await this.itemsService.findAll();
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
        console.log('error', error)
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }
  @Patch(':id')
  async updateItem(
    @Param('id') id: string,
    @Body() body: ItemDto,
  ): Promise<items> {
    try {
      const updatedItem = await this.itemsService.update(id, body);
      return updatedItem;
    } catch (error) {
        console.log('error', error)
      throw new NotFoundException(error.message);
    }
  }
  @Get(':id')
  async findOne(@Res() response: Response, @Param('id') id: string) {
    try {
      const data: items = await this.itemsService.findOne(id);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      console.log('error', error);
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }

  // @Patch(':id')
  // async update(
  //   @Res() response: Response,
  //   @Param('id') id: number,
  //   @Body() body: ItemDto,
  // ) {
  //   try {
  //     const data: Items = await this.itemsService.update(id, body);
  //     response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
  //   } catch (error) {
  //     response
  //       .status(PostgreStatusCode.AUTHORIZATION_ERROR)
  //       .send({ error: true, message: error });
  //   }
  // }

  @Delete(':id')
  async remove(@Res() response: Response, @Param('id') id: string) {
    try {
      const data: items = await this.itemsService.remove(id);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      console.log('error', error);
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }
}
