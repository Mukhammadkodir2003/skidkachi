import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IStoreSubscribeCreationAttr {
  store_id: number;
  user_id: number;
}

@Table({ tableName: "store_subscribe", timestamps: true })
export class StoreSubscribe extends Model<
  StoreSubscribe,
  IStoreSubscribeCreationAttr
> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  store_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number;
}
