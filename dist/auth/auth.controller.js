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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const auth_login_dto_1 = require("./dto/auth-login.dto");
const swagger_1 = require("@nestjs/swagger");
const cookie_getter_decorator_1 = require("../decorators/cookie_getter.decorator");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    signup(createUserDto) {
        return this.authService.signup(createUserDto);
    }
    async signin(authLoginDto, res) {
        return this.authService.signin(authLoginDto, res);
    }
    async signout(refreshToken, res) {
        return this.authService.signout(refreshToken, res);
    }
    async refresh(id, refreshToken, res) {
        return this.authService.refreshToken(id, refreshToken, res);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Yangi foydalanuvchini ro'yxatdan o'tkazish" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Ro'yxatdan o'tgan foydalanuvchi",
        type: String,
    }),
    (0, common_1.Post)("signup"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signup", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Tizimga kirish" }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)("signin"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_login_dto_1.AuthLoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signin", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Tizimdan chiqish" }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)("signout"),
    __param(0, (0, cookie_getter_decorator_1.CookieGetter)("refresh_token")),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signout", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Refresh tokens" }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)(":id/refresh"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, cookie_getter_decorator_1.CookieGetter)("refresh_token")),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)("Authentication"),
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map