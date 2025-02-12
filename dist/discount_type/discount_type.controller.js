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
exports.DiscountTypeController = void 0;
const common_1 = require("@nestjs/common");
const discount_type_service_1 = require("./discount_type.service");
const create_discount_type_dto_1 = require("./dto/create-discount_type.dto");
const update_discount_type_dto_1 = require("./dto/update-discount_type.dto");
let DiscountTypeController = class DiscountTypeController {
    constructor(discountTypeService) {
        this.discountTypeService = discountTypeService;
    }
    create(createDiscountTypeDto) {
        return this.discountTypeService.create(createDiscountTypeDto);
    }
    findAll() {
        return this.discountTypeService.findAll();
    }
    findOne(id) {
        return this.discountTypeService.findOne(+id);
    }
    update(id, updateDiscountTypeDto) {
        return this.discountTypeService.update(+id, updateDiscountTypeDto);
    }
    remove(id) {
        return this.discountTypeService.remove(+id);
    }
};
exports.DiscountTypeController = DiscountTypeController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_discount_type_dto_1.CreateDiscountTypeDto]),
    __metadata("design:returntype", void 0)
], DiscountTypeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DiscountTypeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DiscountTypeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_discount_type_dto_1.UpdateDiscountTypeDto]),
    __metadata("design:returntype", void 0)
], DiscountTypeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DiscountTypeController.prototype, "remove", null);
exports.DiscountTypeController = DiscountTypeController = __decorate([
    (0, common_1.Controller)('discount-type'),
    __metadata("design:paramtypes", [discount_type_service_1.DiscountTypeService])
], DiscountTypeController);
//# sourceMappingURL=discount_type.controller.js.map