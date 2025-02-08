import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAdminCreationAttr {
  name: string;
  email: string;
  is_creator: string;
  password: string;
}

@Table({ tableName: "admin", timestamps: true })
export class Admin extends Model<Admin, IAdminCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  is_creator: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
}
