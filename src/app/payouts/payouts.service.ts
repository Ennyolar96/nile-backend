import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../orders/entities/order.entity';
import { VendorsService } from '../vendors/vendors.service';
import { PayoutSummaryDto } from './dto/payout-summary.dto';
import { OrderStatus } from 'src/common/enum/order-status.enum';

@Injectable()
export class PayoutsService {
  private readonly PLATFORM_FEE_PERCENTAGE = 0.05; // 5%

  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private vendorsService: VendorsService,
  ) {}

  async calculateVendorPayout(vendorId: string): Promise<PayoutSummaryDto> {
    // Verify vendor exists
    const vendor = await this.vendorsService.findOne(vendorId);

    // Get all completed orders for the vendor
    const completedOrders = await this.orderRepository.find({
      where: {
        vendor_id: vendorId,
        status: OrderStatus.COMPLETED,
      },
    });

    // Calculate totals
    const totalOrders = completedOrders.length;
    const totalAmount = completedOrders.reduce(
      (sum, order) => sum + Number(order.amount),
      0,
    );
    const platformFee = totalAmount * this.PLATFORM_FEE_PERCENTAGE;
    const netPayout = totalAmount - platformFee;

    return {
      vendor: vendor.name,
      total_orders: totalOrders,
      total_amount: Math.round(totalAmount * 100) / 100, // Round to 2 decimal places
      platform_fee: Math.round(platformFee * 100) / 100,
      net_payout: Math.round(netPayout * 100) / 100,
    };
  }
}
