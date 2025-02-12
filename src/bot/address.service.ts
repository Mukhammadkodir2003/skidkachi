import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Bot } from "./models/bot.model";
import { InjectBot } from "nestjs-telegraf";
import { BOT_NAME } from "../app.constants";
import { Context, Markup, Telegraf } from "telegraf";
import { Address } from "./models/address.model";

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Bot) private readonly botModel: typeof Bot,
    @InjectModel(Address) private readonly addressModel: typeof Address,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>
  ) {}

  async onAddress(ctx: Context) {
    try {
      await ctx.reply(`Foydalanuvchi manzillari!`, {
        parse_mode: "HTML",
        ...Markup.keyboard([
          [
            "Mening manzillarim",
            "Yangi manzil qo'shish",
          ],
        ]).resize(),
      });

      // const user_id = ctx.from?.id;
      // const user = await this.botModel.findByPk(user_id);
    } catch (err) {
      console.log("OnStop error:", err);
    }
  }

  async onCommandNewAddress(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);
      if (!user || !user.status) {
        await ctx.reply(`Siz avval ro'yxatdan o'tishni yakunlang`, {
          parse_mode: "HTML",
          ...Markup.keyboard([["/start"]]).resize(),
        });
      } else {
        user.action = "address";
        user?.save();
        await this.addressModel.create({ user_id, last_state: "name" });
        await ctx.reply(
          `Yangi manzil nomini kiriting (masalan: <i>uyim</i>): `,
          {
            parse_mode: "HTML",
            ...Markup.removeKeyboard(),
          }
        );
      }
      // await ctx.reply(``);
    } catch (err) {
      console.log("onCommandNewAddress error:", err);
    }
  }

  async onCommandMyAddresses(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);
      if (!user || !user.status) {
        await ctx.reply(`Siz avval ro'yxatdan o'tishni yakunlang`, {
          parse_mode: "HTML",
          ...Markup.keyboard([["/start"]]).resize(),
        });
      } else {
        const addresses = await this.addressModel.findAll({
          where: { user_id, last_state: "finish" },
        });

        addresses.forEach(async (address) => {
          await ctx.replyWithHTML(
            `<b>Manzil nomi:</b> ${address.name}\n` +
              `<b>Manzil:</b> ${address.address}\n`,
            {
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
            }
          );
        });

        // await ctx.reply(`Sizning manzillaringiz `, {
        //   parse_mode: "HTML",
        //   ...Markup.inlineKeyboard([]),
        // });
      }
    } catch (err) {
      console.log("onCommandMyAddressError");
    }
  }

  async onClickLocation(ctx: Context) {
    try {
      const action = ctx.callbackQuery!["data"];
      const addressId = action.split("_")[1];
      const address = await this.addressModel.findByPk(addressId);
      await ctx.replyWithLocation(
        Number(address?.location![0]),
        Number(address?.location![1])
      );
    } catch (err) {
      console.log("onClickLocation error:", err);
    }
  }

  async onClickDelLocation(ctx: Context) {
    try {
      const action = ctx.callbackQuery!["data"];
      const addressId = action.split("_")[1];
      const messageId = ctx.message?.message_id;
      await ctx.deleteMessage(messageId);
      await this.addressModel.destroy({
        where: { id: addressId },
      });
     await ctx.replyWithHTML(`Muvaffaqiyatli o'chirildi`);
    } catch (err) {
      console.log("onClickLocation error:", err);
    }
  }
}
