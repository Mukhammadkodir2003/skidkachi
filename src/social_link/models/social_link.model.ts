import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ISocialLinkCreationAttr {
  name: string;
  icon: string;
}

@Table({ tableName: "social_link", timestamps: true })
export class SocialLink extends Model<SocialLink, ISocialLinkCreationAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  icon: string;
}
