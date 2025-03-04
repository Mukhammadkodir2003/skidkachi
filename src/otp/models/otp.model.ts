import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IOtpCreationAttr {
  id: string;
  otp: string;
  expiration_time: Date;
  phone_number: string;
}

@Table({ tableName: "otp" })
export class Otp extends Model<Otp, IOtpCreationAttr> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
  })
  phone_number: string;

  @Column({
    type: DataType.STRING,
  })
  otp: string;

  @Column({
    type: DataType.DATE,
  })
  expiration_time: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  verified: boolean;
}
