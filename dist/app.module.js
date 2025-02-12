"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
const users_module_1 = require("./users/users.module");
const user_model_1 = require("./users/models/user.model");
const auth_module_1 = require("./auth/auth.module");
const mail_module_1 = require("./mail/mail.module");
const discount_module_1 = require("./discount/discount.module");
const photo_module_1 = require("./photo/photo.module");
const admin_module_1 = require("./admin/admin.module");
const social_link_module_1 = require("./social_link/social_link.module");
const category_module_1 = require("./category/category.module");
const discount_type_module_1 = require("./discount_type/discount_type.module");
const bot_module_1 = require("./bot/bot.module");
const nestjs_telegraf_1 = require("nestjs-telegraf");
const app_constants_1 = require("./app.constants");
const store_module_1 = require("./store/store.module");
const store_subscribe_module_1 = require("./store-subscribe/store-subscribe.module");
const bot_model_1 = require("./bot/models/bot.model");
const address_model_1 = require("./bot/models/address.model");
const district_module_1 = require("./district/district.module");
const region_module_1 = require("./region/region.module");
const file_amazon_module_1 = require("./file-amazon/file-amazon.module");
const file_module_1 = require("./file/file.module");
const favourite_module_1 = require("./favourite/favourite.module");
const store_model_1 = require("./store/models/store.model");
const district_model_1 = require("./district/model/district.model");
const region_model_1 = require("./region/model/region.model");
const social_link_model_1 = require("./social_link/models/social_link.model");
const otp_module_1 = require("./otp/otp.module");
const otp_model_1 = require("./otp/models/otp.model");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_telegraf_1.TelegrafModule.forRootAsync({
                botName: app_constants_1.BOT_NAME,
                useFactory: () => ({
                    token: process.env.BOT_TOKEN || "12345",
                    middlewares: [],
                    include: [bot_module_1.BotModule],
                }),
            }),
            config_1.ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: "postgres",
                host: process.env.POSTGRES_HOST,
                username: process.env.POSTGRES_USER,
                port: Number(process.env.POSTGRES_PORT),
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                models: [user_model_1.Users, bot_model_1.Bot, address_model_1.Address, store_model_1.Store, district_model_1.District, region_model_1.Region, social_link_model_1.SocialLink, otp_model_1.Otp],
                autoLoadModels: true,
                sync: { alter: true },
                logging: false,
            }),
            admin_module_1.AdminModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            mail_module_1.MailModule,
            district_module_1.DistrictModule,
            region_module_1.RegionModule,
            file_amazon_module_1.FileAmazonModule,
            file_module_1.FileModule,
            social_link_module_1.SocialLinkModule,
            discount_type_module_1.DiscountTypeModule,
            category_module_1.CategoryModule,
            bot_module_1.BotModule,
            store_module_1.StoreModule,
            store_subscribe_module_1.StoreSubscribeModule,
            discount_module_1.DiscountModule,
            favourite_module_1.FavouriteModule,
            photo_module_1.PhotoModule,
            otp_module_1.OtpModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map