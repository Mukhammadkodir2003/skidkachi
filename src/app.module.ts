import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { Users } from "./users/models/user.model";
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { DiscountModule } from './discount/discount.module';
import { PhotoModule } from './photo/photo.module';
import { AdminModule } from './admin/admin.module';
import { SocialLinkModule } from './social_link/social_link.module';
import { CategoryModule } from './category/category.module';
import { DiscountTypeModule } from './discount_type/discount_type.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      username: process.env.POSTGRES_USER,
      port: Number(process.env.POSTGRES_PORT),
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Users],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    UsersModule,
    AuthModule,
    MailModule,
    DiscountModule,
    PhotoModule,
    AdminModule,
    SocialLinkModule,
    CategoryModule,
    DiscountTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
