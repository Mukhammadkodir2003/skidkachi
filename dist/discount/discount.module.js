"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountModule = void 0;
const common_1 = require("@nestjs/common");
const discount_service_1 = require("./discount.service");
const discount_controller_1 = require("./discount.controller");
const discount_model_1 = require("./models/discount.model");
const sequelize_1 = require("@nestjs/sequelize");
const address_model_1 = require("../bot/models/address.model");
let DiscountModule = class DiscountModule {
};
exports.DiscountModule = DiscountModule;
exports.DiscountModule = DiscountModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([discount_model_1.Discount, address_model_1.Address])],
        controllers: [discount_controller_1.DiscountController],
        providers: [discount_service_1.DiscountService],
    })
], DiscountModule);
//# sourceMappingURL=discount.module.js.map