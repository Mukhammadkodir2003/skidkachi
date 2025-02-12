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
exports.SocialLinkService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const social_link_model_1 = require("./models/social_link.model");
let SocialLinkService = class SocialLinkService {
    constructor(socialLinkModel) {
        this.socialLinkModel = socialLinkModel;
    }
    create(createSocialLinkDto) {
        return this.socialLinkModel.create(createSocialLinkDto);
    }
    findAll() {
        return this.socialLinkModel.findAll({
            include: { all: true },
        });
    }
    findOne(id) {
        return this.socialLinkModel.findByPk(id, {
            include: { all: true },
        });
    }
    async update(id, updateSocialLinkDto) {
        const socialLink = await this.socialLinkModel.update(updateSocialLinkDto, {
            where: { id },
            returning: true,
        });
        return socialLink[1][0];
    }
    remove(id) {
        return this.socialLinkModel.destroy({ where: { id } });
    }
};
exports.SocialLinkService = SocialLinkService;
exports.SocialLinkService = SocialLinkService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(social_link_model_1.SocialLink)),
    __metadata("design:paramtypes", [Object])
], SocialLinkService);
//# sourceMappingURL=social_link.service.js.map