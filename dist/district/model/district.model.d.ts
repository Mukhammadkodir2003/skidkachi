import { Model } from "sequelize-typescript";
import { Region } from "../../region/model/region.model";
import { Store } from "../../store/models/store.model";
interface IDistrictCreateAttr {
    name: string;
    image: string;
    regionId: number;
}
export declare class District extends Model<District, IDistrictCreateAttr> {
    id: number;
    name: string;
    image: string;
    regionId: number;
    region: Region;
    stores: Store[];
}
export {};
