"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountTypeModule = void 0;
const common_1 = require("@nestjs/common");
const discount_type_service_1 = require("./discount_type.service");
const discount_type_controller_1 = require("./discount_type.controller");
const discount_type_model_1 = require("./models/discount_type.model");
const sequelize_1 = require("@nestjs/sequelize");
let DiscountTypeModule = class DiscountTypeModule {
};
exports.DiscountTypeModule = DiscountTypeModule;
exports.DiscountTypeModule = DiscountTypeModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([discount_type_model_1.DiscountType])],
        controllers: [discount_type_controller_1.DiscountTypeController],
        providers: [discount_type_service_1.DiscountTypeService],
    })
], DiscountTypeModule);
//# sourceMappingURL=discount_type.module.js.map