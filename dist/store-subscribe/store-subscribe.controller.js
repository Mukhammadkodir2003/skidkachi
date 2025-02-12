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
exports.StoreSubscribeController = void 0;
const common_1 = require("@nestjs/common");
const store_subscribe_service_1 = require("./store-subscribe.service");
const create_store_subscribe_dto_1 = require("./dto/create-store-subscribe.dto");
const update_store_subscribe_dto_1 = require("./dto/update-store-subscribe.dto");
let StoreSubscribeController = class StoreSubscribeController {
    constructor(storeSubscribeService) {
        this.storeSubscribeService = storeSubscribeService;
    }
    create(createStoreSubscribeDto) {
        return this.storeSubscribeService.create(createStoreSubscribeDto);
    }
    findAll() {
        return this.storeSubscribeService.findAll();
    }
    findOne(id) {
        return this.storeSubscribeService.findOne(+id);
    }
    update(id, updateStoreSubscribeDto) {
        return this.storeSubscribeService.update(+id, updateStoreSubscribeDto);
    }
    remove(id) {
        return this.storeSubscribeService.remove(+id);
    }
};
exports.StoreSubscribeController = StoreSubscribeController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_store_subscribe_dto_1.CreateStoreSubscribeDto]),
    __metadata("design:returntype", void 0)
], StoreSubscribeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StoreSubscribeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StoreSubscribeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_store_subscribe_dto_1.UpdateStoreSubscribeDto]),
    __metadata("design:returntype", void 0)
], StoreSubscribeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StoreSubscribeController.prototype, "remove", null);
exports.StoreSubscribeController = StoreSubscribeController = __decorate([
    (0, common_1.Controller)('store-subscribe'),
    __metadata("design:paramtypes", [store_subscribe_service_1.StoreSubscribeService])
], StoreSubscribeController);
//# sourceMappingURL=store-subscribe.controller.js.map