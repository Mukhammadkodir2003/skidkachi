import { Column, DataType, Table } from "sequelize-typescript";

import { Model } from "sequelize-typescript";

interface IPhotoCreationAttr {
  url: string;
  discount_id: number;
}

@Table({ tableName: "photo", timestamps: true })
export class Photo extends Model<Photo, IPhotoCreationAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  url: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  discount_id: number;
}
