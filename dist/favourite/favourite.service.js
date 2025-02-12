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
exports.FavouriteService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const favourite_model_1 = require("./models/favourite.model");
let FavouriteService = class FavouriteService {
    constructor(favouriteModel) {
        this.favouriteModel = favouriteModel;
    }
    create(createFavouriteDto) {
        return this.favouriteModel.create(createFavouriteDto);
    }
    findAll() {
        return this.favouriteModel.findAll({ include: { all: true } });
    }
    findOne(id) {
        return this.favouriteModel.findByPk(id);
    }
    update(id, updateFavouriteDto) {
        return this.favouriteModel.update(updateFavouriteDto, {
            where: { id },
            returning: true,
        });
    }
    remove(id) {
        return this.favouriteModel.destroy({ where: { id } });
    }
};
exports.FavouriteService = FavouriteService;
exports.FavouriteService = FavouriteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(favourite_model_1.Favourite)),
    __metadata("design:paramtypes", [Object])
], FavouriteService);
//# sourceMappingURL=favourite.service.js.map