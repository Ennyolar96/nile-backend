import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { VendorsService } from '../vendors/vendors.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private vendorsService: VendorsService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    // Verify vendor exists
    await this.vendorsService.findOne(createOrderDto.vendor_id);

    try {
      const order = this.orderRepository.create({
        ...createOrderDto,
        timestamp: new Date(createOrderDto.timestamp),
      });
      return await this.orderRepository.save(order);
    } catch (error) {
      if (
        error.code === 'SQLITE_CONSTRAINT_UNIQUE' ||
        error.code === 'SQLITE_CONSTRAINT'
      ) {
        throw new ConflictException('Order with this order_id already exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['vendor'],
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['vendor'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);

    if (updateOrderDto.vendor_id) {
      await this.vendorsService.findOne(updateOrderDto.vendor_id);
    }

    try {
      Object.assign(order, updateOrderDto);
      if (updateOrderDto.timestamp) {
        order.timestamp = new Date(updateOrderDto.timestamp);
      }
      return await this.orderRepository.save(order);
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        throw new ConflictException('Order with this order_id already exists');
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }
}
