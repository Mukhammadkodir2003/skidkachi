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
exports.RegionService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const region_model_1 = require("./model/region.model");
const file_service_1 = require("../file/file.service");
const file_amazon_service_1 = require("../file-amazon/file-amazon.service");
let RegionService = class RegionService {
    constructor(regionmodel, fileService, fileAmazonService) {
        this.regionmodel = regionmodel;
        this.fileService = fileService;
        this.fileAmazonService = fileAmazonService;
    }
    async create(createRegionDto, image) {
        try {
            const fileName = await this.fileAmazonService.uploadFile(image);
            if (fileName) {
                return this.regionmodel.create({
                    ...createRegionDto,
                    image: fileName,
                });
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException("File yuklashda xatolik ro'y berdi");
        }
    }
    findAll() {
        return this.regionmodel.findAll({ include: { all: true } });
    }
    async findOne(id) {
        const findRegion = await this.regionmodel.findByPk(id);
        return findRegion;
    }
    update(id, updateRegionDto) {
        return this.regionmodel.update(updateRegionDto, {
            where: { id },
            returning: true,
        });
    }
    remove(id) {
        return this.regionmodel.destroy({ where: { id } });
    }
};
exports.RegionService = RegionService;
exports.RegionService = RegionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(region_model_1.Region)),
    __metadata("design:paramtypes", [Object, file_service_1.FileService,
        file_amazon_service_1.FileAmazonService])
], RegionService);
//# sourceMappingURL=region.service.js.map