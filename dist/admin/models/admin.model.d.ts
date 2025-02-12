import { Model } from "sequelize-typescript";
interface IAdminCreationAttr {
    name: string;
    email: string;
    is_creator: string;
    password: string;
}
export declare class Admin extends Model<Admin, IAdminCreationAttr> {
    id: number;
    name: string;
    email: string;
    is_creator: string;
    password: string;
}
export {};
