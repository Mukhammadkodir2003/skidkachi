import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
export declare class OtpService {
    create(createOtpDto: CreateOtpDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateOtpDto: UpdateOtpDto): string;
    remove(id: number): string;
}
