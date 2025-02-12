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
      await ctx.reply(`Foydalanuvchi avtomobillari!`, {
        parse_mode: "HTML",
        ...Markup.keyboard([
          ["Mening avtomobillarim", "Yangi avtomobil qo'shish"],
        ]).resize(),
      });
    } catch (err) {
      console.log("OnCar error:", err);
    }
  }

  async onCommandNewCar(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);
      if (!user || !user.status) {
        await ctx.reply(`Siz avval ro'yxatdan o'tishni yakunlang`, {
          parse_mode: "HTML",
          ...Markup.keyboard([["/start"]]).resize(),
        });
      } else {
        user.action = "car";
        user?.save();
        await this.carModel.create({ user_id, last_state: "model" });
        await ctx.reply(
          `Yangi avtomobil modelini kiriting (masalan: <i>Nexia 2</i>): `,
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

  async onCommandMyCares(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);
      if (!user || !user.status) {
        await ctx.reply(`Siz avval ro'yxatdan o'tishni yakunlang`, {
          parse_mode: "HTML",
          ...Markup.keyboard([["/start"]]).resize(),
        });
      } else {
        const cars = await this.carModel.findAll({
          where: { user_id, last_state: "finish" },
        });

        cars.forEach(async (car) => {
          await ctx.replyWithHTML(
            `<b>Avtomobil modeli:</b> ${car.model}\n` +
              `<b>Raqami:</b> ${car.number}\n` +
              `<b>Rangi:</b> ${car.color}\n` +
              `<b>Yili:</b> ${car.year}`,
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: "Avtomobilni taxrirlash",
                      callback_data: `getCar_${car.id}`,
                    },
                    {
                      text: "Avtomobilni o'chirish",
                      callback_data: `delCar_${car.id}`,
                    },
                  ],
                ],
              },
            }
          );
        });
      }
    } catch (err) {
      console.log("onCommandMyCarsError");
    }
  }

  async onClickDelCar(ctx: Context) {
    try {
      const action = ctx.callbackQuery!["data"];
      const carId = action.split("_")[1];
      await this.carModel.destroy({
        where: { id: carId },
      });
      await ctx.replyWithHTML(`Muvaffaqiyatli o'chirildi`);
    } catch (err) {
      console.log("onClickDelCar error:", err);
    }
  }

  async onText(ctx: Context) {
    try {
      if ("text" in ctx.message!) {
        const user_id = ctx.from?.id;
        const user = await this.botModel.findByPk(user_id);
        if (!user || !user.status) {
          await ctx.reply(`Siz avval ro'yxatdan o'tishni yakunlang`, {
            parse_mode: "HTML",
            ...Markup.keyboard([["/start"]]).resize(),
          });
        } else {
          const car = await this.carModel.findOne({
            where: { user_id },
            order: [["id", "DESC"]],
          });
          if (car && car.last_state !== "finish") {
            if (car.last_state == "model") {
              car.model = ctx.message.text;
              car.last_state = "number";
              await car.save();
              await ctx.reply(`Avtomobil raqamini kiriting:`, {
                parse_mode: "HTML",
                ...Markup.removeKeyboard(),
              });
            } else if (car.last_state == "number") {
              car.number = ctx.message.text;
              car.last_state = "color";
              await car.save();
              await ctx.reply(`Avtomobil rangini kiriting:`, {
                parse_mode: "HTML",
                ...Markup.removeKeyboard(),
              });
            } else if (car.last_state == "color") {
              car.color = ctx.message.text;
              car.last_state = "year";
              await car.save();
              await ctx.reply(`Avtomobil yilini kiriting:`, {
                parse_mode: "HTML",
                ...Markup.removeKeyboard(),
              });
            } else if (car.last_state == "year") {
              car.year = parseInt(ctx.message.text);
              car.last_state = "finish";
              await car.save();
              await ctx.reply(`Avtomobil muvaffaqiyatli qo'shildi!`, {
                parse_mode: "HTML",
                ...Markup.keyboard([
                  ["Mening avtomobillarim", "Yangi avtomobil qo'shish"],
                ]).resize(),
              });
            }
          }
        }
      }
    } catch (err) {
      console.log("onText error:", err);
    }
  }
}
