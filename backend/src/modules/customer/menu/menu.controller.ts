import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Response } from 'express';

import { MenuService } from './menu.service';
import { PostgreStatusCode } from 'src/common/enums/enums';
import { MenuEndpoints } from './endpoints';
import { ApiResponseTags } from 'src/common/helper/decorators/api-response-tags.decorator';

@ApiTags('Menu')
@ApiResponseTags()
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get(MenuEndpoints.getAllCategories)
  async getAllCategories(@Res() response: Response) {
    try {
      const data = await this.menuService.getAllCategories();
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }

  @Get(MenuEndpoints.getItems)
  async getAllItems(@Res() response: Response) {
    try {
      const data = await this.menuService.getAllItems();
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }

  @Get(MenuEndpoints.getItem)
  async getItem(@Res() response: Response, @Param('id') id: string) {
    try {
      const data = await this.menuService.getItem(id);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }
}
