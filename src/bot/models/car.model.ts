import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ICarCreationAttr {
  user_id: number | undefined;
  last_state: string | undefined;
}

@Table({ tableName: "car" })
export class Car extends Model<Car, ICarCreationAttr> {
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
  number: string;

  @Column({ type: DataType.STRING })
  model: string;

  @Column({ type: DataType.STRING })
  color: string;

  @Column({ type: DataType.INTEGER })
  year: number;

  @Column({ type: DataType.STRING })
  last_state: string;
}
