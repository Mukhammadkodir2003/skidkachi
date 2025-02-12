import { Model } from "sequelize-typescript";
interface IBotCreationAttr {
    user_id: number;
    username: string | undefined;
    first_name: string | undefined;
    last_name: string | undefined;
    lang: string | undefined;
}
export declare class Bot extends Model<Bot, IBotCreationAttr> {
    user_id: number;
    username: string | undefined;
    first_name: string | undefined;
    last_name: string | undefined;
    phone_number: string;
    lang: string | undefined;
    status: boolean;
    action: string;
    temp: string;
}
export {};
