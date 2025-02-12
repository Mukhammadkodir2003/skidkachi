import { Model } from "sequelize-typescript";
interface IStoreSubscribeCreationAttr {
    store_id: number;
    user_id: number;
}
export declare class StoreSubscribe extends Model<StoreSubscribe, IStoreSubscribeCreationAttr> {
    id: number;
    store_id: number;
    user_id: number;
}
export {};
