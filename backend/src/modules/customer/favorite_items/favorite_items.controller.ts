import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  UseGuards,
  Req,

} from '@nestjs/common';

import { Response } from 'express';

import { FavoriteItemsService } from './favorite_items.service';
import { FavoriteItemDto } from './dto/create_favorite_items.dto';
import { PostgreStatusCode } from 'src/common/enums/enums';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponseTags } from 'src/common/helper/decorators/api-response-tags.decorator';
import { favorite_items } from '@prisma/client';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';

@ApiTags('Favorite Items')
@ApiResponseTags()
@Controller('favorite-items')
export class FavoriteItemsController {
  constructor(private readonly favoriteItemsService: FavoriteItemsService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Res() response: Response, @Body() body: FavoriteItemDto, @Req() req) {
    try {
      const data: favorite_items = await this.favoriteItemsService.create(body, req.user.id);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }

  @UseGuards(JwtGuard)
  @Get()
  async findAll(@Res() response: Response, @Req() req) {
    try {
      const data: favorite_items[] = await this.favoriteItemsService.findUserAllFavoriteItems(req.user.id);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      console.log('error', error);
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Res() response: Response, @Param('id') id: string) {
    try {
      const data: favorite_items = await this.favoriteItemsService.findOne(id);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      console.log('error', error);
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Res() response: Response, @Param('id') id: string) {
    try {
      const data: favorite_items = await this.favoriteItemsService.remove(id);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      console.log('error', error);
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }
}
