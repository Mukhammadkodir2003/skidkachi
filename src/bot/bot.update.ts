import { Command, Ctx, On, Start, Update } from "nestjs-telegraf";
import { Context, Markup } from "telegraf";
import { BotService } from "./bot.service";

@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService) {}
  @Start()
  async onStart(@Ctx() ctx: Context) {
    await this.botService.start(ctx);
  }
  @On("contact")
  async onContact(@Ctx() ctx: Context) {
    await this.botService.onContact(ctx);
  }

  @Command("stop")
  async onStop(@Ctx() ctx: Context) {
    await this.botService.onStop(ctx);
  }

  @On("location")
  async onLocation(@Ctx() ctx: Context) {
    await this.botService.onLocation(ctx);
  }

  @On("text")
  async onText(@Ctx() ctx: Context) {
    await this.botService.onText(ctx);
  }

  @On("message")
  async onMessage(@Ctx() ctx: Context) {
    console.log("Ushlanmagan message");
  }

  // @On("photo")
  // async onPhoto(@Ctx() ctx: Context) {
  //   if ("photo" in ctx.message!) {
  //     console.log(ctx.message.photo);
  //     await ctx.replyWithPhoto(
  //       String(ctx.message.photo[ctx.message.photo.length - 1].file_id)
  //     );
  //   }
  // }

  // @On("video")
  // async onVideo(@Ctx() ctx: Context) {
  //   if ("video" in ctx.message!) {
  //     console.log(ctx.message.video);
  //     await ctx.replyWithHTML(
  //       String(ctx.message.video[ctx.message.video.duration])
  //     );
  //   }
  // }

  // @On("sticker")
  // async onSticker(@Ctx() ctx: Context) {
  //   if ("sticker" in ctx.message!) {
  //     console.log(ctx.message.sticker);
  //   }
  // }

  // @On("animation")
  // async onAnimation(@Ctx() ctx: Context) {
  //   if ("animation" in ctx.message!) {
  //     console.log(ctx.message.animation);
  //   }
  // }

  // @On("voice")
  // async onVoice(@Ctx() ctx: Context) {
  //   if ("voice" in ctx.message!) {
  //     console.log(ctx.message.voice);
  //     await ctx.replyWithHTML(String(ctx.message.voice.duration));
  //     await ctx.replyWithHTML(String(ctx.message.voice.file_id));
  //     await ctx.replyWithHTML(String(ctx.message.voice.mime_type));
  //     await ctx.replyWithHTML(String(ctx.message.voice.file_size));
  //     await ctx.replyWithAudio(String(ctx.message.voice.file_id));
  //   }
  // }

  // @On("invoice")
  // async onInvoice(@Ctx() ctx: Context) {
  //   if ("invoice" in ctx.message!) {
  //     console.log(ctx.message.invoice);
  //     await ctx.replyWithHTML(String(ctx.message.invoice.currency));
  //     await ctx.replyWithHTML(String(ctx.message.invoice.description));
  //     await ctx.replyWithHTML(String(ctx.message.invoice.start_parameter));
  //     await ctx.replyWithHTML(String(ctx.message.invoice.title));
  //     await ctx.replyWithAudio(String(ctx.message.invoice.total_amount));
  //   }
  // }

  // @On("document")
  // async onDocument(@Ctx() ctx: Context) {
  //   if ("document" in ctx.message!) {
  //     console.log(ctx.message.document);
  //     await ctx.replyWithHTML(String(ctx.message.document.file_id));
  //     await ctx.replyWithHTML(String(ctx.message.document.file_name));
  //     await ctx.replyWithHTML(String(ctx.message.document.file_size));
  //     await ctx.replyWithHTML(String(ctx.message.document.mime_type));
  //     await ctx.replyWithPhoto(String(ctx.message.document.thumbnail));
  //   }
  // }

  // @Hears("hi")
  // async onHear(@Ctx() ctx: Context) {
  //   await ctx.replyWithHTML("Salom");
  // }

  // @Command("help")
  // async onHelpCommand(@Ctx() ctx: Context) {
  //   await ctx.replyWithHTML("Kutib tur");
  // }

  // @Command("inline")
  // async onInlineCommand(@Ctx() ctx: Context) {
  //   const inlineKeyboard = [
  //     [
  //       {
  //         text: "Tugma 1",
  //         callback_data: "button_1",
  //       },
  //       {
  //         text: "Tugma 2",
  //         callback_data: "button_2",
  //       },
  //       {
  //         text: "Tugma 3",
  //         callback_data: "button_3",
  //       },
  //     ],
  //     [
  //       {
  //         text: "Tugma 4",
  //         callback_data: "button_4",
  //       },
  //       {
  //         text: "Tugma 5",
  //         callback_data: "button_5",
  //       },
  //     ],
  //     [
  //       {
  //         text: "Tugma 6",
  //         callback_data: "button_6",
  //       },
  //     ],
  //   ];

  //   await ctx.reply(".", {
  //     reply_markup: {
  //       inline_keyboard: inlineKeyboard,
  //     },
  //   });
  // }

  // @Action(/^button_+[1-9]/)
  // async onButtonActionAny(@Ctx() ctx: Context) {
  //   const actionText = ctx.callbackQuery!["data"];
  //   const buttonId = actionText.split("_")[1];
  //   console.log(actionText);

  //   await ctx.replyWithHTML(`${buttonId} - Button bosildi`);
  // }

  // @Command("main")
  // async onMainButton(@Ctx() ctx: Context) {
  //   await ctx.replyWithHTML(`Kerakli main tugmani bosing`, {
  //     ...Markup.keyboard([
  //       [Markup.button.contactRequest(`Kontakt`)],
  //       [Markup.button.locationRequest(`Lokatsiya`)],
  //       ["dori1"],
  //       ["dori2", "dori3"],
  //       ["dori4", "dori5", "dori6"],
  //     ]),
  //   });
  // }

  // @Hears(/^dori+\d+$/)
  // async onButtonHear(@Ctx() ctx: Context) {
  //   if ("match" in ctx) {
  //     console.log(ctx);

  //     console.log(ctx.match);

  //     ctx.replyWithHTML(`${String(ctx.match)} - bosildi`);
  //   }
  // }
}
