import { Model } from "sequelize-typescript";
interface ICarCreationAttr {
    user_id: number | undefined;
    last_state: string | undefined;
}
export declare class Car extends Model<Car, ICarCreationAttr> {
    id: number;
    user_id: number;
    number: string;
    model: string;
    color: string;
    year: number;
    last_state: string;
}
export {};
