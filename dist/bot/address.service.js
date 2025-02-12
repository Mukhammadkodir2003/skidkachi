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
exports.AddressService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const bot_model_1 = require("./models/bot.model");
const nestjs_telegraf_1 = require("nestjs-telegraf");
const app_constants_1 = require("../app.constants");
const telegraf_1 = require("telegraf");
const address_model_1 = require("./models/address.model");
let AddressService = class AddressService {
    constructor(botModel, addressModel, bot) {
        this.botModel = botModel;
        this.addressModel = addressModel;
        this.bot = bot;
    }
    async onAddress(ctx) {
        try {
            await ctx.reply(`Foydalanuvchi manzillari!`, {
                parse_mode: "HTML",
                ...telegraf_1.Markup.keyboard([
                    [
                        "Mening manzillarim",
                        "Yangi manzil qo'shish",
                    ],
                ]).resize(),
            });
        }
        catch (err) {
            console.log("OnStop error:", err);
        }
    }
    async onCommandNewAddress(ctx) {
        try {
            const user_id = ctx.from?.id;
            const user = await this.botModel.findByPk(user_id);
            if (!user || !user.status) {
                await ctx.reply(`Siz avval ro'yxatdan o'tishni yakunlang`, {
                    parse_mode: "HTML",
                    ...telegraf_1.Markup.keyboard([["/start"]]).resize(),
                });
            }
            else {
                user.action = "address";
                user?.save();
                await this.addressModel.create({ user_id, last_state: "name" });
                await ctx.reply(`Yangi manzil nomini kiriting (masalan: <i>uyim</i>): `, {
                    parse_mode: "HTML",
                    ...telegraf_1.Markup.removeKeyboard(),
                });
            }
        }
        catch (err) {
            console.log("onCommandNewAddress error:", err);
        }
    }
    async onCommandMyAddresses(ctx) {
        try {
            const user_id = ctx.from?.id;
            const user = await this.botModel.findByPk(user_id);
            if (!user || !user.status) {
                await ctx.reply(`Siz avval ro'yxatdan o'tishni yakunlang`, {
                    parse_mode: "HTML",
                    ...telegraf_1.Markup.keyboard([["/start"]]).resize(),
                });
            }
            else {
                const addresses = await this.addressModel.findAll({
                    where: { user_id, last_state: "finish" },
                });
                addresses.forEach(async (address) => {
                    await ctx.replyWithHTML(`<b>Manzil nomi:</b> ${address.name}\n` +
                        `<b>Manzil:</b> ${address.address}\n`, {
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    {
                                        text: "Lokatsiyani ko'rish",
                                        callback_data: `getLoc_${address.id}`,
                                    },
                                    {
                                        text: "Manzilni o'chirish",
                                        callback_data: `delLoc_${address.id}`,
                                    },
                                ],
                            ],
                        },
                    });
                });
            }
        }
        catch (err) {
            console.log("onCommandMyAddressError");
        }
    }
    async onClickLocation(ctx) {
        try {
            const action = ctx.callbackQuery["data"];
            const addressId = action.split("_")[1];
            const address = await this.addressModel.findByPk(addressId);
            await ctx.replyWithLocation(Number(address?.location[0]), Number(address?.location[1]));
        }
        catch (err) {
            console.log("onClickLocation error:", err);
        }
    }
    async onClickDelLocation(ctx) {
        try {
            const action = ctx.callbackQuery["data"];
            const addressId = action.split("_")[1];
            const messageId = ctx.message?.message_id;
            await ctx.deleteMessage(messageId);
            await this.addressModel.destroy({
                where: { id: addressId },
            });
            await ctx.replyWithHTML(`Muvaffaqiyatli o'chirildi`);
        }
        catch (err) {
            console.log("onClickLocation error:", err);
        }
    }
};
exports.AddressService = AddressService;
exports.AddressService = AddressService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(bot_model_1.Bot)),
    __param(1, (0, sequelize_1.InjectModel)(address_model_1.Address)),
    __param(2, (0, nestjs_telegraf_1.InjectBot)(app_constants_1.BOT_NAME)),
    __metadata("design:paramtypes", [Object, Object, telegraf_1.Telegraf])
], AddressService);
//# sourceMappingURL=address.service.js.map