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
exports.Store = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const social_link_model_1 = require("../../social_link/models/social_link.model");
const district_model_1 = require("../../district/model/district.model");
const region_model_1 = require("../../region/model/region.model");
let Store = class Store extends sequelize_typescript_1.Model {
};
exports.Store = Store;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], Store.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Store.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Store.prototype, "location", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Store.prototype, "phone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], Store.prototype, "owner_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => district_model_1.District),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], Store.prototype, "district_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => region_model_1.Region),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], Store.prototype, "region_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: false }),
    __metadata("design:type", Date)
], Store.prototype, "since", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: false }),
    __metadata("design:type", Date)
], Store.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => social_link_model_1.SocialLink),
    __metadata("design:type", Array)
], Store.prototype, "socialLinks", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => district_model_1.District),
    __metadata("design:type", district_model_1.District)
], Store.prototype, "district", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => region_model_1.Region),
    __metadata("design:type", region_model_1.Region)
], Store.prototype, "region", void 0);
exports.Store = Store = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "store", timestamps: true })
], Store);
//# sourceMappingURL=store.model.js.map