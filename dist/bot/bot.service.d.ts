import { Bot } from "./models/bot.model";
import { Context, Telegraf } from "telegraf";
import { Address } from "./models/address.model";
import { Car } from "./models/car.model";
export declare class BotService {
    private readonly botModel;
    private readonly addressModel;
    private readonly carModel;
    private readonly bot;
    constructor(botModel: typeof Bot, addressModel: typeof Address, carModel: typeof Car, bot: Telegraf<Context>);
    start(ctx: Context): Promise<void>;
    onContact(ctx: Context): Promise<void>;
    onStop(ctx: Context): Promise<void>;
    onLocation(ctx: Context): Promise<void>;
    onText(ctx: Context): Promise<void>;
    deleteUncaughtMessage(ctx: Context): Promise<void>;
    sendOtp(phone_number: string, OTP: string): Promise<boolean | undefined>;
}
