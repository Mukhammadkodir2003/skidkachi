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
exports.DistrictService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const district_model_1 = require("./model/district.model");
const file_amazon_service_1 = require("../file-amazon/file-amazon.service");
let DistrictService = class DistrictService {
    constructor(districtModel, fileAmazonService) {
        this.districtModel = districtModel;
        this.fileAmazonService = fileAmazonService;
    }
    async create(createDistrictDto, image) {
        try {
            const fileName = await this.fileAmazonService.uploadFile(image);
            if (fileName) {
                return this.districtModel.create({
                    ...createDistrictDto,
                    image: fileName,
                });
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("File yuklashda xatolik ro'y berdi");
        }
    }
    findAll() {
        return this.districtModel.findAll({ include: { all: true } });
    }
    findOne(id) {
        return this.districtModel.findByPk(id);
    }
    update(id, updateDistrictDto) {
        return this.districtModel.update(updateDistrictDto, {
            where: { id },
            returning: true,
        });
    }
    remove(id) {
        return this.districtModel.destroy({ where: { id } });
    }
};
exports.DistrictService = DistrictService;
exports.DistrictService = DistrictService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(district_model_1.District)),
    __metadata("design:paramtypes", [Object, file_amazon_service_1.FileAmazonService])
], DistrictService);
//# sourceMappingURL=district.service.js.map