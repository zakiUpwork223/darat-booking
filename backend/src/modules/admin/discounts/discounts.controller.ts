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

import { DiscountsService } from './discounts.service';
import { DiscountDto } from './dto/discount.request.dto';
import { PostgreStatusCode } from 'src/common/enums/enums';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponseTags } from 'src/common/helper/decorators/api-response-tags.decorator';
import { discounts } from '@prisma/client';

@ApiTags('Discounts')
@ApiResponseTags()
@Controller('discounts')
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @Post()
  async create(@Res() response: Response, @Body() body: DiscountDto) {
    try {
      const data: discounts = await this.discountsService.create(body);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
        console.log(error)
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }

  @Get()
  async findAll(@Res() response: Response) {
    try {
      const data: discounts[] = await this.discountsService.findAll();
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }

  @Get(':id')
  async findOne(@Res() response: Response, @Param('id') id: string) {
    try {
      const data: discounts = await this.discountsService.findOne(id);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }

  @Patch(':id')
  async update(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() body: DiscountDto,
  ) {
    try {
      const data: discounts = await this.discountsService.update(id, body);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }

  @Delete(':id')
  async remove(@Res() response: Response, @Param('id') id: string) {
    try {
      const data: discounts = await this.discountsService.remove(id);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }
}
