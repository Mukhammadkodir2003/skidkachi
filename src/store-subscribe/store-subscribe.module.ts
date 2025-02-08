import { Module } from "@nestjs/common";
import { StoreSubscribeService } from "./store-subscribe.service";
import { StoreSubscribeController } from "./store-subscribe.controller";
import { StoreSubscribe } from "./models/store-subscribe.model";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  imports: [SequelizeModule.forFeature([StoreSubscribe])],
  controllers: [StoreSubscribeController],
  providers: [StoreSubscribeService],
})
export class StoreSubscribeModule {}
