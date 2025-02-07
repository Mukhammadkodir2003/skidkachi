import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IDiscountTypeCreationAttr {
  name: string;
  description: string;
}

@Table({ tableName: "" })
export class DiscountType extends Model<
  DiscountType,
  IDiscountTypeCreationAttr
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;
}
