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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async signup(createUserDto) {
        const candidate = await this.userService.findByEmail(createUserDto.email);
        if (candidate) {
            throw new common_1.BadRequestException("Bunday foydalanuvchi mavjud");
        }
        const user = await this.userService.create(createUserDto);
        const response = {
            message: "Tabriklayman! " +
                "Tizimga muvaffaqiyatli qo'shildingiz. " +
                "Akkauntni faollashtirish uchun emailga yuborilgan xabarni tasdiqlang",
            userId: user.id,
        };
        return response;
    }
    async signin(authLoginDto, res) {
        const { email, password } = authLoginDto;
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException("User ro'yxatdan o'tmagan");
        }
        const isMatchPass = await bcrypt.compare(password, user.hashed_password);
        if (!isMatchPass) {
            throw new common_1.UnauthorizedException("User ro'yxatdan o'tmagan");
        }
        const tokens = await this.userService.getTokens(user);
        const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
        const updatedUser = await this.userService.updateRefreshToken(user.id, hashed_refresh_token);
        if (!updatedUser) {
            throw new common_1.InternalServerErrorException("Tokenni saqlashda xatolik");
        }
        res.cookie("refresh_token", tokens.refreshToken, {
            maxAge: Number(process.env.COOKIE_TIME),
            httpOnly: true,
        });
        const response = {
            message: "Tizimga kirildi",
            userId: user.id,
            access_token: tokens.accessToken,
        };
        return response;
    }
    async signout(refreshToken, res) {
        const userData = await this.jwtService.verify(refreshToken, {
            secret: process.env.REFRESH_TOKEN_KEY,
        });
        if (!userData) {
            throw new common_1.ForbiddenException("User not verified");
        }
        const hashed_refresh_token = null;
        await this.userService.updateRefreshToken(userData.id, hashed_refresh_token);
        res.clearCookie("refresh_token");
        const response = {
            message: "User logged out successfully",
        };
        return response;
    }
    async refreshToken(userId, refreshToken, res) {
        const decodedToken = await this.jwtService.decode(refreshToken);
        if (userId != decodedToken.id) {
            throw new common_1.ForbiddenException("Ruxsat etilmagan");
        }
        const user = await this.userService.findOne(userId);
        if (!user || !user.hashed_refresh_token) {
            throw new common_1.BadRequestException("User not found");
        }
        const tokenMatch = await bcrypt.compare(refreshToken, user.hashed_refresh_token);
        if (!tokenMatch) {
            throw new common_1.ForbiddenException("Forbidden");
        }
        const tokens = await this.userService.getTokens(user);
        const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
        const updatedUser = await this.userService.updateRefreshToken(user.id, hashed_refresh_token);
        if (!updatedUser) {
            throw new common_1.InternalServerErrorException("Tokenni saqlashda xatolik");
        }
        res.cookie("refresh_token", tokens.refreshToken, {
            maxAge: Number(process.env.COOKIE_TIME),
            httpOnly: true,
        });
        const response = {
            message: "Tokenlar yangilandi",
            userId: user.id,
            access_token: tokens.accessToken,
        };
        return response;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map