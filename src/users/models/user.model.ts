import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Table, Model } from "sequelize-typescript";

interface IUserInterfaceAttr {
  name: string;
  phone: string;
  email: string;
  hashed_password: string;
  activation_link: string;
}

@Table({ tableName: "users", timestamps: true })
export class Users extends Model<Users, IUserInterfaceAttr> {
  @ApiProperty({
    example: 1,
    description: "Foydalanuvchi ID raqami",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  phone: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  hashed_password: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  is_active: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  is_owner: boolean;

  @Column({ type: DataType.STRING })
  hashed_refresh_token: string;

  @Column({ type: DataType.STRING })
  activation_link: string;
}
