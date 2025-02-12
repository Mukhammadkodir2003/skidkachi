"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavouriteModule = void 0;
const common_1 = require("@nestjs/common");
const favourite_service_1 = require("./favourite.service");
const favourite_controller_1 = require("./favourite.controller");
const sequelize_1 = require("@nestjs/sequelize");
const favourite_model_1 = require("./models/favourite.model");
let FavouriteModule = class FavouriteModule {
};
exports.FavouriteModule = FavouriteModule;
exports.FavouriteModule = FavouriteModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([favourite_model_1.Favourite])],
        controllers: [favourite_controller_1.FavouriteController],
        providers: [favourite_service_1.FavouriteService],
    })
], FavouriteModule);
//# sourceMappingURL=favourite.module.js.map