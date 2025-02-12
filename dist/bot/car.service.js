"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const bot_model_1 = require("./models/bot.model");
const nestjs_telegraf_1 = require("nestjs-telegraf");
const app_constants_1 = require("../app.constants");
const telegraf_1 = require("telegraf");
const car_model_1 = require("./models/car.model");
let CarService = class CarService {
    constructor(botModel, carModel, bot) {
        this.botModel = botModel;
        this.carModel = carModel;
        this.bot = bot;
    }
    async onCar(ctx) {
        try {
            await ctx.reply(`🚗 Foydalanuvchi mashinalari!`, {
                parse_mode: "HTML",
                ...telegraf_1.Markup.keyboard([
                    ["🚗 Mening mashinalarim", "➕ Yangi mashina qo'shish"],
                ]).resize(),
            });
        }
        catch (err) {
            console.log("OnStop error:", err);
        }
    }
    async onCommandNewCar(ctx) {
        try {
            const user_id = ctx.from?.id;
            const user = await this.botModel.findByPk(user_id);
            if (!user || !user.status) {
                await ctx.reply(`⚠️ Siz avval ro'yxatdan o'tishni yakunlang`, {
                    parse_mode: "HTML",
                    ...telegraf_1.Markup.keyboard([["/start"]]).resize(),
                });
            }
            else {
                user.action = "car";
                await user.save();
                await this.carModel.create({ user_id, last_state: "number" });
                await ctx.reply(`🔢 Yangi mashina raqamini kiriting (masalan: <i>01A777AA</i>): `, {
                    parse_mode: "HTML",
                    ...telegraf_1.Markup.removeKeyboard(),
                });
            }
        }
        catch (err) {
            console.log("onCommandNewCar error:", err);
        }
    }
    async onCommandMyCars(ctx) {
        try {
            const user_id = ctx.from?.id;
            const user = await this.botModel.findByPk(user_id);
            if (!user || !user.status) {
                await ctx.reply(`⚠️ Siz avval ro'yxatdan o'tishni yakunlang`, {
                    parse_mode: "HTML",
                    ...telegraf_1.Markup.keyboard([["/start"]]).resize(),
                });
            }
            else {
                const cars = await this.carModel.findAll({
                    where: { user_id, last_state: "finish" },
                });
                if (cars.length === 0) {
                    await ctx.reply(`🚗 Siz hali mashina qo'shmagansiz`, {
                        parse_mode: "HTML",
                        ...telegraf_1.Markup.keyboard([["➕ Yangi mashina qo'shish"]]).resize(),
                    });
                }
                for (const car of cars) {
                    await ctx.replyWithHTML(`🚗 <b>Mashina ma'lumotlari:</b>\n\n` +
                        `🔢 <b>Raqami:</b> ${car.number}\n` +
                        `📝 <b>Modeli:</b> ${car.model}\n` +
                        `🎨 <b>Rangi:</b> ${car.color}\n` +
                        `📅 <b>Yili:</b> ${car.year}\n`, {
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    {
                                        text: "🗑 Mashinani o'chirish",
                                        callback_data: `delCar_${car.id}`,
                                    },
                                    {
                                        text: "✏️ Mashinani tahrirlash",
                                        callback_data: `editCar_${car.id}`,
                                    },
                                ],
                            ],
                        },
                    });
                }
            }
        }
        catch (err) {
            console.log("onCommandMyCarsError");
        }
    }
    async onClickDelCar(ctx) {
        try {
            const action = ctx.callbackQuery["data"];
            const carId = action.split("_")[1];
            if (ctx.callbackQuery?.message) {
                await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
            }
            await this.carModel.destroy({
                where: { id: carId },
            });
            await ctx.replyWithHTML(`✅ Muvaffaqiyatli o'chirildi`);
        }
        catch (err) {
            console.log("onClickDelCar error:", err);
        }
    }
    async onClickEditCar(ctx) {
        try {
            const messageId = ctx.callbackQuery?.message?.message_id;
            const action = ctx.callbackQuery["data"];
            const carId = action.split("_")[1];
            const user_id = ctx.from?.id;
            const user = await this.botModel.findByPk(user_id);
            if (messageId && user) {
                await ctx.reply(`✏️ Tahrirlash turini tanlang:`, {
                    parse_mode: "HTML",
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: "🔢 Raqamni o'zgartirish",
                                    callback_data: `editCarNumber_${carId}`,
                                },
                                {
                                    text: "📝 Modelni o'zgartirish",
                                    callback_data: `editCarModel_${carId}`,
                                },
                            ],
                            [
                                {
                                    text: "🎨 Rangni o'zgartirish",
                                    callback_data: `editCarColor_${carId}`,
                                },
                                {
                                    text: "�� Yilni o'zgartirish",
                                    callback_data: `editCarYear_${carId}`,
                                },
                            ],
                        ],
                    },
                });
                if (ctx.callbackQuery?.message) {
                    await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
                }
            }
        }
        catch (err) {
            console.log("onClickEditCar error:", err);
        }
    }
    async onEditCarField(ctx, field) {
        try {
            const action = ctx.callbackQuery["data"];
            const carId = action.split("_")[1];
            const user_id = ctx.from?.id;
            const user = await this.botModel.findByPk(user_id);
            if (user) {
                user.action = `editCar${field}`;
                user.temp = carId;
                await user.save();
                const emoji = {
                    Number: "🔢",
                    Model: "📝",
                    Color: "🎨",
                    Year: "📅",
                }[field];
                await ctx.reply(`${emoji} Yangi ${field.toLowerCase()}ni kiriting:`, {
                    parse_mode: "HTML",
                    ...telegraf_1.Markup.removeKeyboard(),
                });
            }
        }
        catch (err) {
            console.log(`onEditCar${field} error:`, err);
        }
    }
};
exports.CarService = CarService;
exports.CarService = CarService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(bot_model_1.Bot)),
    __param(1, (0, sequelize_1.InjectModel)(car_model_1.Car)),
    __param(2, (0, nestjs_telegraf_1.InjectBot)(app_constants_1.BOT_NAME)),
    __metadata("design:paramtypes", [Object, Object, telegraf_1.Telegraf])
], CarService);
//# sourceMappingURL=car.service.js.map