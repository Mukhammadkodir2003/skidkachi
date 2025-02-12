import { Model } from "sequelize-typescript";
interface IPhotoCreationAttr {
    url: string;
    discount_id: number;
}
export declare class Photo extends Model<Photo, IPhotoCreationAttr> {
    id: number;
    url: string;
    discount_id: number;
}
export {};
