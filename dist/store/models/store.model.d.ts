import { Model } from "sequelize-typescript";
import { SocialLink } from "../../social_link/models/social_link.model";
import { District } from "../../district/model/district.model";
import { Region } from "../../region/model/region.model";
interface IStoreCreationAttr {
    name: string;
    location: string;
    phone: string;
    owner_id: number;
    district_id: number;
    region_id: number;
    since: Date;
}
export declare class Store extends Model<Store, IStoreCreationAttr> {
    id: number;
    name: string;
    location: string;
    phone: string;
    owner_id: number;
    district_id: number;
    region_id: number;
    since: Date;
    createdAt: Date;
    socialLinks: SocialLink[];
    district: District;
    region: Region;
}
export {};
