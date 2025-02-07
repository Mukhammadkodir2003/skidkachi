import { Module } from '@nestjs/common';
import { DiscountTypeService } from './discount_type.service';
import { DiscountTypeController } from './discount_type.controller';

@Module({
  controllers: [DiscountTypeController],
  providers: [DiscountTypeService],
})
export class DiscountTypeModule {}
