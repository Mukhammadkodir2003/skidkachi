import { Model } from "sequelize-typescript";
import { Store } from "../../store/models/store.model";
interface ISocialLinkCreationAttr {
    name: string;
    icon: string;
    url: string;
}
export declare class SocialLink extends Model<SocialLink, ISocialLinkCreationAttr> {
    id: number;
    name: string;
    icon: string;
    url: string;
    store_id: number;
    store: Store;
}
export {};
