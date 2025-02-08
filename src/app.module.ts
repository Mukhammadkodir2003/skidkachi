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

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN!,
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
      models: [Users],
      autoLoadModels: true,
      sync: { force: true },
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
    BotModule,
    StoreModule,
    StoreSubscribeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
