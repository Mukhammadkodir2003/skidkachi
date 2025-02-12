import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAddressCreationAttr {
  user_id: number | undefined;
  last_state: string | undefined;
}

@Table({ tableName: "address" })
export class Address extends Model<Address, IAddressCreationAttr> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.BIGINT,
  })
  user_id: number;

  @Column({ type: DataType.STRING })
  name: string | undefined;

  @Column({ type: DataType.STRING })
  address: string | undefined;

  @Column({ type: DataType.STRING })
  location: string | undefined;

  @Column({ type: DataType.STRING })
  last_state: string;
}
