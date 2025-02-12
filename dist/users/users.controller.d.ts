import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { FindUserDto } from "./dto/find-user.dto";
import { PhoneUserDto } from "./dto/phone-user.dto";
import { VerifyOtpDto } from "./dto/verify_otp.dto";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./models/user.model").Users>;
    newOtp(phoneUserDto: PhoneUserDto): Promise<{
        message: string;
        verification_key: string;
    }>;
    verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<{
        message: string;
    }>;
    findAll(): Promise<import("./models/user.model").Users[]>;
    findUser(findUserDto: FindUserDto): Promise<import("./models/user.model").Users[]>;
    findOne(id: string): Promise<import("./models/user.model").Users | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./models/user.model").Users>;
    remove(id: string): Promise<number>;
    activate(id: string): Promise<{
        message: string;
        user: boolean;
    }>;
}
