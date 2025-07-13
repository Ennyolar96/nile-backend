import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './app/auth/auth.module';
import { User } from './app/auth/entities/auth.entity';
import { Order } from './app/orders/entities/order.entity';
import { OrdersModule } from './app/orders/orders.module';
import { PayoutsModule } from './app/payouts/payouts.module';
import { Vendor } from './app/vendors/entities/vendor.entity';
import { VendorsModule } from './app/vendors/vendors.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'nile_payout.db',
      entities: [Vendor, Order, User],
      synchronize: true,
      logging: true,
    }),
    AuthModule,
    VendorsModule,
    OrdersModule,
    PayoutsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
