import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Bot } from "./models/bot.model";
import { InjectBot } from "nestjs-telegraf";
import { BOT_NAME } from "../app.constants";
import { Context, Markup, Telegraf } from "telegraf";
import { Car } from "./models/car.model";

@Injectable()
export class CarService {
  constructor(
    @InjectModel(Bot) private readonly botModel: typeof Bot,
    @InjectModel(Car) private readonly carModel: typeof Car,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>
  ) {}

  async onCar(ctx: Context) {
    try {
      await ctx.reply(`🚗 Foydalanuvchi mashinalari!`, {
        parse_mode: "HTML",
        ...Markup.keyboard([
          ["🚗 Mening mashinalarim", "➕ Yangi mashina qo'shish"],
        ]).resize(),
      });
    } catch (err) {
      console.log("OnStop error:", err);
    }
  }

  async onCommandNewCar(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);
      if (!user || !user.status) {
        await ctx.reply(`⚠️ Siz avval ro'yxatdan o'tishni yakunlang`, {
          parse_mode: "HTML",
          ...Markup.keyboard([["/start"]]).resize(),
        });
      } else {
        user.action = "car";
        await user.save();
        await this.carModel.create({ user_id, last_state: "number" });
        await ctx.reply(
          `🔢 Yangi mashina raqamini kiriting (masalan: <i>01A777AA</i>): `,
          {
            parse_mode: "HTML",
            ...Markup.removeKeyboard(),
          }
        );
      }
    } catch (err) {
      console.log("onCommandNewCar error:", err);
    }
  }

  async onCommandMyCars(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);
      if (!user || !user.status) {
        await ctx.reply(`⚠️ Siz avval ro'yxatdan o'tishni yakunlang`, {
          parse_mode: "HTML",
          ...Markup.keyboard([["/start"]]).resize(),
        });
      } else {
        const cars = await this.carModel.findAll({
          where: { user_id, last_state: "finish" },
        });
        if (cars.length === 0) {
          await ctx.reply(`🚗 Siz hali mashina qo'shmagansiz`, {
            parse_mode: "HTML",
            ...Markup.keyboard([["➕ Yangi mashina qo'shish"]]).resize(),
          });
        }

        for (const car of cars) {
          await ctx.replyWithHTML(
            `🚗 <b>Mashina ma'lumotlari:</b>\n\n` +
              `🔢 <b>Raqami:</b> ${car.number}\n` +
              `📝 <b>Modeli:</b> ${car.model}\n` +
              `🎨 <b>Rangi:</b> ${car.color}\n` +
              `📅 <b>Yili:</b> ${car.year}\n`,
            {
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
            }
          );
        }
      }
    } catch (err) {
      console.log("onCommandMyCarsError");
    }
  }

  async onClickDelCar(ctx: Context) {
    try {
      const action = ctx.callbackQuery!["data"];
      const carId = action.split("_")[1];
      if (ctx.callbackQuery?.message) {
        await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
      }
      await this.carModel.destroy({
        where: { id: carId },
      });
      await ctx.replyWithHTML(`✅ Muvaffaqiyatli o'chirildi`);
    } catch (err) {
      console.log("onClickDelCar error:", err);
    }
  }

  async onClickEditCar(ctx: Context) {
    try {
      const messageId = ctx.callbackQuery?.message?.message_id;
      const action = ctx.callbackQuery!["data"];
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

        // Delete the original message to avoid confusion
        if (ctx.callbackQuery?.message) {
          await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
        }
      }
    } catch (err) {
      console.log("onClickEditCar error:", err);
    }
  }

  async onEditCarField(ctx: Context, field: string) {
    try {
      const action = ctx.callbackQuery!["data"];
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
          ...Markup.removeKeyboard(),
        });
      }
    } catch (err) {
      console.log(`onEditCar${field} error:`, err);
    }
  }
}
