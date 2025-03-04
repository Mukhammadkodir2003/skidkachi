"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotModule = void 0;
const common_1 = require("@nestjs/common");
const bot_service_1 = require("./bot.service");
const bot_update_1 = require("./bot.update");
const sequelize_1 = require("@nestjs/sequelize");
const bot_model_1 = require("./models/bot.model");
const address_update_1 = require("./address.update");
const address_service_1 = require("./address.service");
const address_model_1 = require("./models/address.model");
const car_model_1 = require("./models/car.model");
const car_update_1 = require("./car.update");
const car_service_1 = require("./car.service");
let BotModule = class BotModule {
};
exports.BotModule = BotModule;
exports.BotModule = BotModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([bot_model_1.Bot, address_model_1.Address, car_model_1.Car])],
        providers: [
            car_service_1.CarService,
            car_update_1.CarUpdate,
            address_service_1.AddressService,
            address_update_1.AddressUpdate,
            bot_service_1.BotService,
            bot_update_1.BotUpdate,
        ],
        exports: [bot_service_1.BotService],
    })
], BotModule);
//# sourceMappingURL=bot.module.js.map