import { Bot } from "./models/bot.model";
import { Context, Telegraf } from "telegraf";
import { Car } from "./models/car.model";
export declare class CarService {
    private readonly botModel;
    private readonly carModel;
    private readonly bot;
    constructor(botModel: typeof Bot, carModel: typeof Car, bot: Telegraf<Context>);
    onCar(ctx: Context): Promise<void>;
    onCommandNewCar(ctx: Context): Promise<void>;
    onCommandMyCars(ctx: Context): Promise<void>;
    onClickDelCar(ctx: Context): Promise<void>;
    onClickEditCar(ctx: Context): Promise<void>;
    onEditCarField(ctx: Context, field: string): Promise<void>;
}
