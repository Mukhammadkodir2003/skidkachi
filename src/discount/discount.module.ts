import { Module } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { DiscountController } from './discount.controller';
import { Discount } from './models/discount.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Address } from '../bot/models/address.model';

@Module({
  imports: [SequelizeModule.forFeature([Discount, Address])],
  controllers: [DiscountController],
  providers: [DiscountService],
})
export class DiscountModule {}
