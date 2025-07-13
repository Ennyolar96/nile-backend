import {
  Controller,
  Get,
  Param,
  UseGuards,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PayoutsService } from './payouts.service';
import { PayoutSummaryDto } from './dto/payout-summary.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('payouts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('payouts')
export class PayoutsController {
  constructor(private readonly payoutsService: PayoutsService) {}

  @Get('vendor/:vendorId')
  @ApiOperation({ summary: 'Get payout summary for a specific vendor' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Payout summary calculated successfully',
    type: PayoutSummaryDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Vendor not found',
  })
  async getVendorPayoutSummary(
    @Param('vendorId', ParseUUIDPipe) vendorId: string,
  ): Promise<PayoutSummaryDto> {
    return this.payoutsService.calculateVendorPayout(vendorId);
  }
}
