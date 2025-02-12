"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountService = void 0;
const common_1 = require("@nestjs/common");
const discount_model_1 = require("./models/discount.model");
const sequelize_1 = require("@nestjs/sequelize");
let DiscountService = class DiscountService {
    constructor(discountModel) {
        this.discountModel = discountModel;
    }
    create(createDiscountDto) {
        return this.discountModel.create(createDiscountDto);
    }
    findAll() {
        return this.discountModel.findAll();
    }
    findOne(id) {
        return this.discountModel.findByPk(id);
    }
    async update(id, updateDiscountDto) {
        const discount = await this.discountModel.update(updateDiscountDto, {
            where: { id },
            returning: true,
        });
        return discount[1][0];
    }
    remove(id) {
        return this.discountModel.destroy({ where: { id } });
    }
};
exports.DiscountService = DiscountService;
exports.DiscountService = DiscountService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(discount_model_1.Discount)),
    __metadata("design:paramtypes", [Object])
], DiscountService);
//# sourceMappingURL=discount.service.js.map