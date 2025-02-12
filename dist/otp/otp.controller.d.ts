import { OtpService } from "./otp.service";
import { CreateOtpDto } from "./dto/create-otp.dto";
import { UpdateOtpDto } from "./dto/update-otp.dto";
export declare class OtpController {
    private readonly otpService;
    constructor(otpService: OtpService);
    create(createOtpDto: CreateOtpDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateOtpDto: UpdateOtpDto): string;
    remove(id: string): string;
}
