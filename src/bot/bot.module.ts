import { Module } from "@nestjs/common";
import { BotService } from "./bot.service";
import { BotUpdate } from "./bot.update";
import { SequelizeModule } from "@nestjs/sequelize";
import { Bot } from "./models/bot.model";
import { AddressUpdate } from "./address.update";
import { AddressService } from "./address.service";
import { Address } from "./models/address.model";
import { CarUpdate } from "./car.update";
import { CarService } from "./car.service";
import { Car } from "./models/car.model";
import { TelegrafModule } from "nestjs-telegraf";
import { BOT_NAME } from "src/app.constants";

@Module({
  imports: [SequelizeModule.forFeature([Bot, Address, Car])],
  providers: [
    AddressService,
    AddressUpdate,
    BotService,
    BotUpdate,
    CarService,
    CarUpdate,
  ],
  exports: [BotService],
})
export class BotModule {}
