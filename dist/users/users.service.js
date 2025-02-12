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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("./models/user.model");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mail_service_1 = require("../mail/mail.service");
const sequelize_2 = require("sequelize");
const bot_service_1 = require("../bot/bot.service");
const otpGenerator = require("otp-generator");
const otp_model_1 = require("../otp/models/otp.model");
const addMinutes_1 = require("../helpers/addMinutes");
const crypto_1 = require("../helpers/crypto");
let UsersService = class UsersService {
    constructor(usersModel, otpModel, jwtService, botService, mailService) {
        this.usersModel = usersModel;
        this.otpModel = otpModel;
        this.jwtService = jwtService;
        this.botService = botService;
        this.mailService = mailService;
    }
    async getTokens(user) {
        const payload = {
            id: user.id,
            is_active: user.is_active,
            is_owner: user.is_owner,
        };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: process.env.ACCESS_TOKEN_KEY,
                expiresIn: process.env.ACCESS_TOKEN_TIME,
            }),
            this.jwtService.signAsync(payload, {
                secret: process.env.REFRESH_TOKEN_KEY,
                expiresIn: process.env.REFRESH_TOKEN_TIME,
            }),
        ]);
        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
        };
    }
    async create(createUserDto) {
        if (createUserDto.password !== createUserDto.confirm_password) {
            throw new common_1.BadRequestException("Parollar mos emas");
        }
        const hashed_password = await bcrypt.hash(createUserDto.password, 7);
        const activation_link = uuid.v4();
        const new_user = await this.usersModel.create({
            ...createUserDto,
            hashed_password,
            activation_link,
        });
        try {
            await this.mailService.sendMail(new_user);
        }
        catch (err) {
            console.log(err);
            throw new common_1.InternalServerErrorException("Xat yuborishda xatolik");
        }
        return new_user;
    }
    findAll() {
        return this.usersModel.findAll();
    }
    findOne(id) {
        return this.usersModel.findOne({ where: { id } });
    }
    async findByEmail(email) {
        return this.usersModel.findOne({ where: { email } });
    }
    async update(id, updateUserDto) {
        const user = await this.usersModel.update(updateUserDto, {
            where: { id },
            returning: true,
        });
        return user[1][0];
    }
    async updateRefreshToken(id, hashed_refresh_token) {
        const user = await this.usersModel.update({ hashed_refresh_token }, { where: { id } });
        return user;
    }
    remove(id) {
        return this.usersModel.destroy({ where: { id } });
    }
    async activate(activation_link) {
        const oldUser = await this.usersModel.findOne({
            where: { activation_link },
        });
        if (!oldUser) {
            throw new common_1.NotFoundException("User yoki activation link topilmadi");
        }
        if (oldUser.is_active) {
            throw new common_1.ConflictException("User avval aktivlashtirilgan");
        }
        const user = await this.usersModel.update({ is_active: true }, { where: { activation_link }, returning: true });
        const response = {
            message: "User muvaffaqiyatli aktivlashtirildi",
            user: user[1][0].is_active,
        };
        return response;
    }
    async findUser(findUserDto) {
        const { name, email, phone } = findUserDto;
        const where = {};
        if (name) {
            where["name"] = {
                [sequelize_2.Op.like]: `%${name}%`,
            };
        }
        if (email) {
            where["email"] = {
                [sequelize_2.Op.like]: `%${email}%`,
            };
        }
        if (phone) {
            where["phone"] = {
                [sequelize_2.Op.like]: `%${phone}%`,
            };
        }
        console.log(where);
        const users = await this.usersModel.findAll({ where });
        if (!users) {
            throw new common_1.NotFoundException("Users not found");
        }
        return users;
    }
    async newOtp(PhoneUserDto) {
        const phone_number = PhoneUserDto.phone;
        const otp = otpGenerator.generate(4, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        const isSent = await this.botService.sendOtp(phone_number, otp);
        if (!isSent) {
            throw new common_1.BadRequestException("Avval botdan ro'yxatdan o'ting");
        }
        const now = new Date();
        const expiration_time = (0, addMinutes_1.AddMinutesToDate)(now, 5);
        await this.otpModel.destroy({ where: { phone_number } });
        const newOtpData = await this.otpModel.create({
            id: uuid.v4(),
            otp,
            phone_number,
            expiration_time,
        });
        const details = {
            timestamp: now,
            phone_number,
            otp_id: newOtpData.id,
        };
        const encodedData = await (0, crypto_1.encode)(JSON.stringify(details));
        return {
            message: "OTP botga yuborildi",
            verification_key: encodedData,
        };
    }
    async verifyOtp(verifyOtpDto) {
        const { verification_key, phone: phone_number, otp } = verifyOtpDto;
        const currentDate = new Date();
        const decodedData = await (0, crypto_1.decode)(verification_key);
        const details = JSON.parse(decodedData);
        if (details.phone_number != phone_number) {
            throw new common_1.BadRequestException("Otp bu telefon raqamga yuborilmagan");
        }
        const resultOTP = await this.otpModel.findByPk(details.otp_id);
        if (!resultOTP == null) {
            throw new common_1.BadRequestException("Bunday OTP mavjud emas");
        }
        if (resultOTP?.verified) {
            throw new common_1.BadRequestException("Bu OTP tasdiqlangan");
        }
        if (resultOTP.expiration_time < currentDate) {
            throw new common_1.BadRequestException("OTP muddati tugagan");
        }
        if (resultOTP?.otp != otp) {
            throw new common_1.BadRequestException("OTP kod noto'g'ri");
        }
        const user = await this.usersModel.update({ is_owner: true }, { where: { phone: phone_number }, returning: true });
        if (!user[1][0]) {
            throw new common_1.NotFoundException("User topilmadi");
        }
        await this.otpModel.update({ verified: true }, { where: { id: details.otp_id } });
        return {
            message: "Tabriklaymiz, siz owner bo'ldingiz",
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.Users)),
    __param(1, (0, sequelize_1.InjectModel)(otp_model_1.Otp)),
    __metadata("design:paramtypes", [Object, Object, jwt_1.JwtService,
        bot_service_1.BotService,
        mail_service_1.MailService])
], UsersService);
//# sourceMappingURL=users.service.js.map