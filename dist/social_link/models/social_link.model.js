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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialLink = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const store_model_1 = require("../../store/models/store.model");
let SocialLink = class SocialLink extends sequelize_typescript_1.Model {
};
exports.SocialLink = SocialLink;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], SocialLink.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], SocialLink.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], SocialLink.prototype, "icon", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], SocialLink.prototype, "url", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => store_model_1.Store),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], SocialLink.prototype, "store_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => store_model_1.Store, "store_id"),
    __metadata("design:type", store_model_1.Store)
], SocialLink.prototype, "store", void 0);
exports.SocialLink = SocialLink = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "social_link", timestamps: true })
], SocialLink);
//# sourceMappingURL=social_link.model.js.map