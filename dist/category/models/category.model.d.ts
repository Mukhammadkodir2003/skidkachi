import { Model } from "sequelize-typescript";
interface ICategoryCreationAttr {
    name: string;
    description: string;
    parent_category: number;
}
export declare class Category extends Model<Category, ICategoryCreationAttr> {
    id: number;
    name: string;
    description: string;
    parent_category: number;
}
export {};
