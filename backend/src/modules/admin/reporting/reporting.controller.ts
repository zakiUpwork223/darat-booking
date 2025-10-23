import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { ReportingService } from './reporting.service';
import {
  CancelOrdersReport,
  CustomerOrdersReportDto,
  DashBoardOrders,
  OrdersReportDto,
  SalesReport,
} from './dto/create-reporting.dto';
import { PostgreStatusCode } from 'src/common/enums/enums';
import { ReportingEndpoints } from './endpoints';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponseTags } from 'src/common/helper/decorators/api-response-tags.decorator';

@ApiTags('Reporting')
@ApiResponseTags()
@Controller('reporting')
export class ReportingController {
  constructor(private readonly reportingService: ReportingService) {}

  @Post(ReportingEndpoints.ordersReport)
  async ordersReport(@Res() response: Response, @Body() body: OrdersReportDto) {
    try {
      const data = await this.reportingService.ordersReport(body);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }

  @Post(ReportingEndpoints.customerOrdersReport)
  async customerOrdersReport(
    @Res() response: Response,
    @Body() body: CustomerOrdersReportDto,
  ) {
    try {
      const data = await this.reportingService.customerOrdersReport(body);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }

  @Post(ReportingEndpoints.salesReport)
  async salesReport(@Res() response: Response, @Body() body: SalesReport) {
    try {
      const data = await this.reportingService.salesReport(body);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }

  @Post(ReportingEndpoints.cancelOrdersReport)
  async cancelOrdersReport(
    @Res() response: Response,
    @Body() body: CancelOrdersReport,
  ) {
    try {
      const data = await this.reportingService.cancelOrdersReport(body);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }

  @Post(ReportingEndpoints.dashboardTotalOrders)
  async dashboardTotalOrders(
    @Res() response: Response,
    @Body() body: DashBoardOrders,
  ) {
    try {
      const data = await this.reportingService.dashboardTotalOrders(body);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }

  @Post(ReportingEndpoints.dashboardPendingOrders)
  async dashboardPendingOrders(
    @Res() response: Response,
    @Body() body: DashBoardOrders,
  ) {
    try {
      const data = await this.reportingService.dashboardPendingOrders(body);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }

  @Post(ReportingEndpoints.dashboardCompletedOrders)
  async dashboardCompletedOrders(
    @Res() response: Response,
    @Body() body: DashBoardOrders,
  ) {
    try {
      const data = await this.reportingService.dashboardCompletedOrders(body);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }

  @Post(ReportingEndpoints.dashboardCancelledOrders)
  async dashboardCancelledOrders(
    @Res() response: Response,
    @Body() body: DashBoardOrders,
  ) {
    try {
      const data = await this.reportingService.dashboardCancelledOrders(body);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      response
        .status(PostgreStatusCode.AUTHORIZATION_ERROR)
        .send({ error: true, message: error });
    }
  }
}
