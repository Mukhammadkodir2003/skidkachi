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
exports.DistrictController = void 0;
const common_1 = require("@nestjs/common");
const district_service_1 = require("./district.service");
const create_district_dto_1 = require("./dto/create-district.dto");
const update_district_dto_1 = require("./dto/update-district.dto");
const platform_express_1 = require("@nestjs/platform-express");
let DistrictController = class DistrictController {
    constructor(districtService) {
        this.districtService = districtService;
    }
    create(createDistrictDto, image) {
        return this.districtService.create(createDistrictDto, image);
    }
    findAll() {
        return this.districtService.findAll();
    }
    findOne(id) {
        return this.districtService.findOne(+id);
    }
    update(id, updateDistrictDto) {
        return this.districtService.update(+id, updateDistrictDto);
    }
    remove(id) {
        return this.districtService.remove(+id);
    }
};
exports.DistrictController = DistrictController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image", {
        fileFilter: (req, file, callback) => {
            const allowedTypes = /jpeg|jpg|png|gif/;
            const extname = allowedTypes.test(file.originalname.toLowerCase());
            const mimetype = allowedTypes.test(file.mimetype);
            if (extname && mimetype) {
                callback(null, true);
            }
            else {
                callback(new common_1.BadRequestException("Faqat image filelar yuklash mumkin!"), false);
            }
        },
        limits: {
            fileSize: 2 * 1024 * 1024,
        },
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_district_dto_1.CreateDistrictDto, Object]),
    __metadata("design:returntype", void 0)
], DistrictController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DistrictController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DistrictController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_district_dto_1.UpdateDistrictDto]),
    __metadata("design:returntype", void 0)
], DistrictController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DistrictController.prototype, "remove", null);
exports.DistrictController = DistrictController = __decorate([
    (0, common_1.Controller)("district"),
    __metadata("design:paramtypes", [district_service_1.DistrictService])
], DistrictController);
//# sourceMappingURL=district.controller.js.map