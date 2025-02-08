import { Column, DataType, Model } from "sequelize-typescript";

interface ICategoryCreationAttr {
  name: string;
  description: string;
  parent_category: number;
}

export class Category extends Model<Category, ICategoryCreationAttr> {
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

  @Column({ type: DataType.INTEGER })
  parent_category: number;
}
