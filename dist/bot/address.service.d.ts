import { Bot } from "./models/bot.model";
import { Context, Telegraf } from "telegraf";
import { Address } from "./models/address.model";
export declare class AddressService {
    private readonly botModel;
    private readonly addressModel;
    private readonly bot;
    constructor(botModel: typeof Bot, addressModel: typeof Address, bot: Telegraf<Context>);
    onAddress(ctx: Context): Promise<void>;
    onCommandNewAddress(ctx: Context): Promise<void>;
    onCommandMyAddresses(ctx: Context): Promise<void>;
    onClickLocation(ctx: Context): Promise<void>;
    onClickDelLocation(ctx: Context): Promise<void>;
}
