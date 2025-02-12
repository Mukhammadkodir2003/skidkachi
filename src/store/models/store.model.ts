import {
  Column,
  DataType,
  Model,
  Table,
  HasMany,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { SocialLink } from "../../social_link/models/social_link.model";
import { District } from "../../district/model/district.model";
import { Region } from "../../region/model/region.model";

interface IStoreCreationAttr {
  name: string;
  location: string;
  phone: string;
  owner_id: number;
  district_id: number;
  region_id: number;
  since: Date;
}

@Table({ tableName: "store", timestamps: true })
export class Store extends Model<Store, IStoreCreationAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  location: string;

  @Column({ type: DataType.STRING, allowNull: false })
  phone: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  owner_id: number;

  @ForeignKey(() => District)
  @Column({ type: DataType.INTEGER, allowNull: false })
  district_id: number;

  @ForeignKey(() => Region)
  @Column({ type: DataType.INTEGER, allowNull: false })
  region_id: number;

  @Column({ type: DataType.DATE, allowNull: false })
  since: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  createdAt: Date;

  @HasMany(() => SocialLink)
  socialLinks: SocialLink[];

  @BelongsTo(() => District)
  district: District;

  @BelongsTo(() => Region)
  region: Region;
}
