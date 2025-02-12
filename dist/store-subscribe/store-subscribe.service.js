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
exports.StoreSubscribeService = void 0;
const common_1 = require("@nestjs/common");
const store_subscribe_model_1 = require("./models/store-subscribe.model");
const sequelize_1 = require("@nestjs/sequelize");
let StoreSubscribeService = class StoreSubscribeService {
    constructor(storeSubscribeModel) {
        this.storeSubscribeModel = storeSubscribeModel;
    }
    create(createStoreSubscribeDto) {
        return this.storeSubscribeModel.create(createStoreSubscribeDto);
    }
    findAll() {
        return this.storeSubscribeModel.findAll();
    }
    findOne(id) {
        return this.storeSubscribeModel.findByPk(id);
    }
    async update(id, updateStoreSubscribeDto) {
        const storeSubscribe = await this.storeSubscribeModel.update(updateStoreSubscribeDto, {
            where: { id },
            returning: true,
        });
        return storeSubscribe[1][0];
    }
    remove(id) {
        return this.storeSubscribeModel.destroy({ where: { id } });
    }
};
exports.StoreSubscribeService = StoreSubscribeService;
exports.StoreSubscribeService = StoreSubscribeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(store_subscribe_model_1.StoreSubscribe)),
    __metadata("design:paramtypes", [Object])
], StoreSubscribeService);
//# sourceMappingURL=store-subscribe.service.js.map