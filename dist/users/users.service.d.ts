import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Users } from "./models/user.model";
import { JwtService } from "@nestjs/jwt";
import { MailService } from "../mail/mail.service";
import { FindUserDto } from "./dto/find-user.dto";
import { BotService } from "../bot/bot.service";
import { PhoneUserDto } from "./dto/phone-user.dto";
import { Otp } from "../otp/models/otp.model";
import { VerifyOtpDto } from "./dto/verify_otp.dto";
export declare class UsersService {
    private readonly usersModel;
    private readonly otpModel;
    private readonly jwtService;
    private readonly botService;
    private readonly mailService;
    constructor(usersModel: typeof Users, otpModel: typeof Otp, jwtService: JwtService, botService: BotService, mailService: MailService);
    getTokens(user: Users): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    create(createUserDto: CreateUserDto): Promise<Users>;
    findAll(): Promise<Users[]>;
    findOne(id: number): Promise<Users | null>;
    findByEmail(email: string): Promise<Users | null>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<Users>;
    updateRefreshToken(id: number, hashed_refresh_token: string | null): Promise<[affectedCount: number]>;
    remove(id: number): Promise<number>;
    activate(activation_link: string): Promise<{
        message: string;
        user: boolean;
    }>;
    findUser(findUserDto: FindUserDto): Promise<Users[]>;
    newOtp(PhoneUserDto: PhoneUserDto): Promise<{
        message: string;
        verification_key: string;
    }>;
    verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<{
        message: string;
    }>;
}
