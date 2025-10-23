import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class OrdersReportDto {
  @ApiProperty({
    type: Date,
    required: false,
    description: 'This is a optional property',
  })
  @IsDate()
  @IsOptional()
  startDate: Date;

  @ApiProperty({
    type: Date,
    required: false,
    description: 'This is a optional property',
  })
  @IsDate()
  @IsOptional()
  endDate: Date;

  @ApiProperty({
    type: String,
    required: false,
    description: 'This is a optional property',
  })
  @IsDate()
  @IsOptional()
  status: string;
}

export class CustomerOrdersReportDto {
  @ApiProperty({
    type: Date,
    required: false,
    description: 'This is a optional property',
  })
  @IsDate()
  @IsOptional()
  startDate: Date;

  @ApiProperty({
    type: Date,
    required: false,
    description: 'This is a optional property',
  })
  @IsDate()
  @IsOptional()
  endDate: Date;

  @ApiProperty({
    type: String,
    required: true,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  customer_id: string;
}

export class SalesReport {
  @ApiProperty({
    type: Date,
    required: false,
    description: 'This is a optional property',
  })
  @IsDate()
  @IsOptional()
  startDate: Date;

  @ApiProperty({
    type: Date,
    required: false,
    description: 'This is a optional property',
  })
  @IsDate()
  @IsOptional()
  endDate: Date;
}

export class CancelOrdersReport {
  @ApiProperty({
    type: Date,
    required: false,
    description: 'This is a optional property',
  })
  @IsDate()
  @IsOptional()
  startDate: Date;

  @ApiProperty({
    type: Date,
    required: false,
    description: 'This is a optional property',
  })
  @IsDate()
  @IsOptional()
  endDate: Date;
}

export class DashBoardOrders {
  @ApiProperty({
    type: Date,
    required: false,
    description: 'This is a optional property',
  })
  @IsDate()
  @IsOptional()
  startDate: Date;

  @ApiProperty({
    type: Date,
    required: false,
    description: 'This is a optional property',
  })
  @IsDate()
  @IsOptional()
  endDate: Date;
}
