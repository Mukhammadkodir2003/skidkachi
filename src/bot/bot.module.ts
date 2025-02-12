import { Module } from "@nestjs/common";
import { BotService } from "./bot.service";
import { BotUpdate } from "./bot.update";
import { SequelizeModule } from "@nestjs/sequelize";
import { Bot } from "./models/bot.model";
import { AddressUpdate } from "./address.update";
import { AddressService } from "./address.service";
import { Address } from "./models/address.model";

@Module({
  imports: [SequelizeModule.forFeature([Bot, Address])],
  providers: [AddressService, AddressUpdate, BotService, BotUpdate],
  exports: [BotService],
})
export class BotModule {}
