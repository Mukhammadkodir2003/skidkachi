import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IDiscountCreationAttr {
  store_id: number;
  title: string;
  description: string;
  discount_percent: number;
  start_date: Date;
  end_date: Date;
  category_id: number;
  discount_value: number;
  special_link: string;
  is_active: boolean;
  discount_type_id: number;
}

@Table({ tableName: "discount", timestamps: true })
export class Discount extends Model<Discount, IDiscountCreationAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  store_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  discount_percent: number;

  @Column({ type: DataType.DATE, allowNull: false })
  start_date: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  end_date: Date;

  @Column({ type: DataType.INTEGER, allowNull: false })
  category_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  discount_value: number;

  @Column({ type: DataType.STRING, allowNull: false })
  special_link: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  is_active: boolean;

  @Column({ type: DataType.INTEGER, allowNull: false })
  discount_type_id: number;
}
