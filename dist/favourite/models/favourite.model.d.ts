import { Model } from "sequelize-typescript";
import { Users } from "../../users/models/user.model";
import { Discount } from "../../discount/models/discount.model";
interface IFavouriteCreationAttr {
    userId: number;
    discountId: number;
}
export declare class Favourite extends Model<Favourite, IFavouriteCreationAttr> {
    userId: number;
    user: Users;
    discountId: number;
    discount: Discount;
}
export {};
