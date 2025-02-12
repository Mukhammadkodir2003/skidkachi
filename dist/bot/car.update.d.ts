import { Context } from "telegraf";
import { CarService } from "./car.service";
export declare class CarUpdate {
    private readonly carService;
    constructor(carService: CarService);
    onCar(ctx: Context): Promise<void>;
    onCommandMyCars(ctx: Context): Promise<void>;
    onCommandNewCar(ctx: Context): Promise<void>;
    onClickDelCar(ctx: Context): Promise<void>;
    onClickEditCar(ctx: Context): Promise<void>;
    onClickEditCarNumber(ctx: Context): Promise<void>;
    onClickEditCarModel(ctx: Context): Promise<void>;
    onClickEditCarColor(ctx: Context): Promise<void>;
    onClickEditCarYear(ctx: Context): Promise<void>;
}
