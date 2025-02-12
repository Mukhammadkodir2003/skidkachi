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
exports.PhotoService = void 0;
const common_1 = require("@nestjs/common");
const photo_model_1 = require("./models/photo.model");
const sequelize_1 = require("@nestjs/sequelize");
let PhotoService = class PhotoService {
    constructor(photoModel) {
        this.photoModel = photoModel;
    }
    create(createPhotoDto) {
        return this.photoModel.create(createPhotoDto);
    }
    findAll() {
        return this.photoModel.findAll();
    }
    findOne(id) {
        return this.photoModel.findByPk(id);
    }
    async update(id, updatePhotoDto) {
        const photo = await this.photoModel.update(updatePhotoDto, {
            where: { id },
            returning: true,
        });
        return photo[1][0];
    }
    remove(id) {
        return this.photoModel.destroy({ where: { id } });
    }
};
exports.PhotoService = PhotoService;
exports.PhotoService = PhotoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(photo_model_1.Photo)),
    __metadata("design:paramtypes", [Object])
], PhotoService);
//# sourceMappingURL=photo.service.js.map