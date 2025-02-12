import { Model } from "sequelize-typescript";
interface IAddressCreationAttr {
    user_id: number | undefined;
    last_state: string | undefined;
}
export declare class Address extends Model<Address, IAddressCreationAttr> {
    id: number;
    user_id: number;
    name: string | undefined;
    address: string | undefined;
    location: string | undefined;
    last_state: string;
}
export {};
