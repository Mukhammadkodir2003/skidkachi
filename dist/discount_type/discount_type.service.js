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
exports.DiscountTypeService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const discount_type_model_1 = require("./models/discount_type.model");
let DiscountTypeService = class DiscountTypeService {
    constructor(discountTypeModel) {
        this.discountTypeModel = discountTypeModel;
    }
    create(createDiscountTypeDto) {
        return this.discountTypeModel.create(createDiscountTypeDto);
    }
    findAll() {
        return this.discountTypeModel.findAll();
    }
    findOne(id) {
        return this.discountTypeModel.findByPk(id);
    }
    async update(id, updateDiscountTypeDto) {
        const discountType = await this.discountTypeModel.update(updateDiscountTypeDto, {
            where: { id },
            returning: true,
        });
        return discountType[1][0];
    }
    remove(id) {
        return this.discountTypeModel.destroy({ where: { id } });
    }
};
exports.DiscountTypeService = DiscountTypeService;
exports.DiscountTypeService = DiscountTypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(discount_type_model_1.DiscountType)),
    __metadata("design:paramtypes", [Object])
], DiscountTypeService);
//# sourceMappingURL=discount_type.service.js.map