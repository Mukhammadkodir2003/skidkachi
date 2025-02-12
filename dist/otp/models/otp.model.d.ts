import { Model } from "sequelize-typescript";
interface IOtpCreationAttr {
    id: string;
    otp: string;
    expiration_time: Date;
    phone_number: string;
}
export declare class Otp extends Model<Otp, IOtpCreationAttr> {
    id: string;
    phone_number: string;
    otp: string;
    expiration_time: Date;
    verified: boolean;
}
export {};
