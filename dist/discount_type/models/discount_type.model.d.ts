import { Model } from "sequelize-typescript";
interface IDiscountTypeCreationAttr {
    name: string;
    description: string;
}
export declare class DiscountType extends Model<DiscountType, IDiscountTypeCreationAttr> {
    id: number;
    name: string;
    description: string;
}
export {};
