import { ApiProperty } from '@nestjs/swagger';

export class PayoutSummaryDto {
  @ApiProperty({ description: 'Vendor name' })
  vendor: string;

  @ApiProperty({ description: 'Total number of completed orders' })
  total_orders: number;

  @ApiProperty({ description: 'Total amount from completed orders' })
  total_amount: number;

  @ApiProperty({ description: 'Platform fee (5%)' })
  platform_fee: number;

  @ApiProperty({ description: 'Net payout amount after platform fee' })
  net_payout: number;
}
