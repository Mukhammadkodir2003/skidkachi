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
exports.FavouriteController = void 0;
const common_1 = require("@nestjs/common");
const favourite_service_1 = require("./favourite.service");
const create_favourite_dto_1 = require("./dto/create-favourite.dto");
const update_favourite_dto_1 = require("./dto/update-favourite.dto");
let FavouriteController = class FavouriteController {
    constructor(favouriteService) {
        this.favouriteService = favouriteService;
    }
    create(createFavouriteDto) {
        return this.favouriteService.create(createFavouriteDto);
    }
    findAll() {
        return this.favouriteService.findAll();
    }
    findOne(id) {
        return this.favouriteService.findOne(+id);
    }
    update(id, updateFavouriteDto) {
        return this.favouriteService.update(+id, updateFavouriteDto);
    }
    remove(id) {
        return this.favouriteService.remove(+id);
    }
};
exports.FavouriteController = FavouriteController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_favourite_dto_1.CreateFavouriteDto]),
    __metadata("design:returntype", void 0)
], FavouriteController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FavouriteController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FavouriteController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_favourite_dto_1.UpdateFavouriteDto]),
    __metadata("design:returntype", void 0)
], FavouriteController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FavouriteController.prototype, "remove", null);
exports.FavouriteController = FavouriteController = __decorate([
    (0, common_1.Controller)("favourite"),
    __metadata("design:paramtypes", [favourite_service_1.FavouriteService])
], FavouriteController);
//# sourceMappingURL=favourite.controller.js.map