import { Context } from "telegraf";
import { BotService } from "./bot.service";
export declare class BotUpdate {
    private readonly botService;
    constructor(botService: BotService);
    onStart(ctx: Context): Promise<void>;
    onContact(ctx: Context): Promise<void>;
    onStop(ctx: Context): Promise<void>;
    onLocation(ctx: Context): Promise<void>;
    onText(ctx: Context): Promise<void>;
    onMessage(ctx: Context): Promise<void>;
}
