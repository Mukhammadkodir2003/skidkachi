import { Model } from "sequelize-typescript";
import { District } from "../../district/model/district.model";
interface ICreateRegionAttr {
    name: string;
    image: string;
}
export declare class Region extends Model<Region, ICreateRegionAttr> {
    id: number;
    name: string;
    image: string;
    district: District[];
}
export {};
