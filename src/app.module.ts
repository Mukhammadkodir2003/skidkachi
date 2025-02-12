import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { Users } from "./users/models/user.model";
import { AuthModule } from "./auth/auth.module";
import { MailModule } from "./mail/mail.module";
import { DiscountModule } from "./discount/discount.module";
import { PhotoModule } from "./photo/photo.module";
import { AdminModule } from "./admin/admin.module";
import { SocialLinkModule } from "./social_link/social_link.module";
import { CategoryModule } from "./category/category.module";
import { DiscountTypeModule } from "./discount_type/discount_type.module";
import { BotModule } from "./bot/bot.module";
import { TelegrafModule } from "nestjs-telegraf";
import { BOT_NAME } from "./app.constants";
import { StoreModule } from "./store/store.module";
import { StoreSubscribeModule } from "./store-subscribe/store-subscribe.module";
import { Bot } from "./bot/models/bot.model";
import { Address } from "./bot/models/address.model";
import { DistrictModule } from "./district/district.module";
import { RegionModule } from "./region/region.module";
import { FileAmazonModule } from "./file-amazon/file-amazon.module";
import { FileModule } from "./file/file.module";
import { FavouriteModule } from "./favourite/favourite.module";
import { Store } from "./store/models/store.model";
import { District } from "./district/model/district.model";
import { Region } from "./region/model/region.model";
import { SocialLink } from "./social_link/models/social_link.model";
import { OtpModule } from "./otp/otp.module";
import { Otp } from "./otp/models/otp.model";

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN || "12345",
        middlewares: [],
        include: [BotModule],
      }),
    }),
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      username: process.env.POSTGRES_USER,
      port: Number(process.env.POSTGRES_PORT),
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Users, Bot, Address, Store, District, Region, SocialLink, Otp],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    AdminModule,
    UsersModule,
    AuthModule,
    MailModule,
    DistrictModule,
    RegionModule,
    FileAmazonModule,
    FileModule,
    SocialLinkModule,
    DiscountTypeModule,
    CategoryModule,
    BotModule,
    StoreModule,
    StoreSubscribeModule,
    DiscountModule,
    FavouriteModule,
    PhotoModule,
    OtpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
