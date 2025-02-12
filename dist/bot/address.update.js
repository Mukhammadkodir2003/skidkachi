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
exports.AddressUpdate = void 0;
const nestjs_telegraf_1 = require("nestjs-telegraf");
const telegraf_1 = require("telegraf");
const address_service_1 = require("./address.service");
let AddressUpdate = class AddressUpdate {
    constructor(addressService) {
        this.addressService = addressService;
    }
    async onAddress(ctx) {
        await this.addressService.onAddress(ctx);
    }
    async onCommandNewAddress(ctx) {
        await this.addressService.onCommandNewAddress(ctx);
    }
    async onCommandMyAddresses(ctx) {
        await this.addressService.onCommandMyAddresses(ctx);
    }
    async onClickLocation(ctx) {
        await this.addressService.onClickLocation(ctx);
    }
    async onClickDelLocation(ctx) {
        await this.addressService.onClickDelLocation(ctx);
    }
};
exports.AddressUpdate = AddressUpdate;
__decorate([
    (0, nestjs_telegraf_1.Command)("address"),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegraf_1.Context]),
    __metadata("design:returntype", Promise)
], AddressUpdate.prototype, "onAddress", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)("Yangi manzil qo'shish"),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegraf_1.Context]),
    __metadata("design:returntype", Promise)
], AddressUpdate.prototype, "onCommandNewAddress", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)("Mening manzillarim"),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegraf_1.Context]),
    __metadata("design:returntype", Promise)
], AddressUpdate.prototype, "onCommandMyAddresses", null);
__decorate([
    (0, nestjs_telegraf_1.Action)(/^getLoc_+\d+/),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegraf_1.Context]),
    __metadata("design:returntype", Promise)
], AddressUpdate.prototype, "onClickLocation", null);
__decorate([
    (0, nestjs_telegraf_1.Action)(/^delLoc_+\d+/),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegraf_1.Context]),
    __metadata("design:returntype", Promise)
], AddressUpdate.prototype, "onClickDelLocation", null);
exports.AddressUpdate = AddressUpdate = __decorate([
    (0, nestjs_telegraf_1.Update)(),
    __metadata("design:paramtypes", [address_service_1.AddressService])
], AddressUpdate);
//# sourceMappingURL=address.update.js.map