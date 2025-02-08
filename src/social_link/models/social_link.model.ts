import {
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { Store } from "../../store/models/store.model";

interface ISocialLinkCreationAttr {
  name: string;
  icon: string;
  url: string;
}

@Table({ tableName: "social_link", timestamps: true })
export class SocialLink extends Model<SocialLink, ISocialLinkCreationAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  icon: string;

  @Column({ type: DataType.STRING, allowNull: false })
  url: string;

  @ForeignKey(() => Store)
  @Column({ type: DataType.INTEGER, allowNull: false })
  store_id: number;

  @BelongsTo(() => Store, "store_id")
  store: Store;
}
