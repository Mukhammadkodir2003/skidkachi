import { Module } from "@nestjs/common";
import { DiscountTypeService } from "./discount_type.service";
import { DiscountTypeController } from "./discount_type.controller";
import { DiscountType } from "./models/discount_type.model";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  imports: [SequelizeModule.forFeature([DiscountType])],
  controllers: [DiscountTypeController],
  providers: [DiscountTypeService],
})
export class DiscountTypeModule {}
