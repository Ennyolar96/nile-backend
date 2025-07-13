import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
  IsDateString,
  IsDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from 'src/common/enum/order-status.enum';
import { Transform } from 'class-transformer';

export class CreateOrderDto {
  @ApiProperty({ description: 'Unique order identifier' })
  @IsString()
  @IsNotEmpty()
  order_id: string;

  @ApiProperty({ description: 'Order amount', minimum: 0.01 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  amount: number;

  @ApiProperty({ description: 'Order status', enum: OrderStatus })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiProperty({ description: 'Order timestamp' })
  @IsDate()
  @Transform(({ value }) => new Date(value))
  timestamp: string;

  @ApiProperty({ description: 'Vendor ID' })
  @IsUUID()
  @IsNotEmpty()
  vendor_id: string;
}
