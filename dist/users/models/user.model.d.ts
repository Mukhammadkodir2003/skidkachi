import { Model } from "sequelize-typescript";
interface IUserInterfaceAttr {
    name: string;
    phone: string;
    email: string;
    hashed_password: string;
    activation_link: string;
}
export declare class Users extends Model<Users, IUserInterfaceAttr> {
    id: number;
    name: string;
    phone: string;
    email: string;
    hashed_password: string;
    is_active: boolean;
    is_owner: boolean;
    hashed_refresh_token: string | null;
    activation_link: string;
}
export {};
