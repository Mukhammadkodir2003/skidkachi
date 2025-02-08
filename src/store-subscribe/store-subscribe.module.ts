import { Module } from '@nestjs/common';
import { StoreSubscribeService } from './store-subscribe.service';
import { StoreSubscribeController } from './store-subscribe.controller';

@Module({
  controllers: [StoreSubscribeController],
  providers: [StoreSubscribeService],
})
export class StoreSubscribeModule {}
