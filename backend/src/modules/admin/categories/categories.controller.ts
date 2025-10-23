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

import { CategoriesService } from './categories.service';
import { CategoryDto, UpdateCategoryDto } from './dto/category.request.dto';
import { CategoriesEndpoints } from './endpoints';
import { PostgreStatusCode } from 'src/common/enums/enums';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponseTags } from 'src/common/helper/decorators/api-response-tags.decorator';
import { categories } from '@prisma/client';

@ApiTags('Categories')
@ApiResponseTags()
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post(CategoriesEndpoints.createCategory)
  async create(@Res() response: Response, @Body() body: CategoryDto) {
    try {
      const data: categories = await this.categoriesService.create(body);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }

  @Get('non-discounted-categories')
  async findAllWithoutDiscount(@Res() response: Response) {
    try {
      const data = await this.categoriesService.findCategoriesWithoutDiscount();
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }

  @Get(CategoriesEndpoints.getAllCategories)
  async findAll(@Res() response: Response) {
    try {
      const data: categories[] = await this.categoriesService.findAll();
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      console.log('error', error)
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }

  @Get(CategoriesEndpoints.getCategory)
  async findOne(@Res() response: Response, @Param('id') id: string) {
    try {
      const data: categories = await this.categoriesService.findOne(id);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }

  @Patch(CategoriesEndpoints.updateCategory)
  async update(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() body: UpdateCategoryDto,
  ) {
    try {
      const data: categories = await this.categoriesService.update(id, body);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }

  @Delete(CategoriesEndpoints.deleteCategory)
  async remove(@Res() response: Response, @Param('id') id: string) {
    try {
      const data: categories = await this.categoriesService.remove(id);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }
}
