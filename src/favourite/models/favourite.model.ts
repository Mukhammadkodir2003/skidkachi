import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Users } from "../../users/models/user.model";
import { Discount } from "../../discount/models/discount.model";

interface IFavouriteCreationAttr {
  userId: number;
  discountId: number;
}

@Table({ tableName: "favourite" })
export class Favourite extends Model<Favourite, IFavouriteCreationAttr> {
  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => Users)
  user: Users;

  @ForeignKey(() => Discount)
  @Column({ type: DataType.INTEGER })
  discountId: number;

  @BelongsTo(() => Discount)
  discount: Discount;
}
