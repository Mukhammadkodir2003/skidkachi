"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialLinkModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const social_link_service_1 = require("./social_link.service");
const social_link_controller_1 = require("./social_link.controller");
const social_link_model_1 = require("./models/social_link.model");
let SocialLinkModule = class SocialLinkModule {
};
exports.SocialLinkModule = SocialLinkModule;
exports.SocialLinkModule = SocialLinkModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([social_link_model_1.SocialLink])],
        controllers: [social_link_controller_1.SocialLinkController],
        providers: [social_link_service_1.SocialLinkService],
        exports: [social_link_service_1.SocialLinkService],
    })
], SocialLinkModule);
//# sourceMappingURL=social_link.module.js.map