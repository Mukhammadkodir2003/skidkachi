import {
  Action,
  Command,
  Ctx,
  Hears,
  On,
  Start,
  Update,
} from "nestjs-telegraf";
import { Context, Markup } from "telegraf";
import { CarService } from "./car.service";

@Update()
export class CarUpdate {
  constructor(private readonly carService: CarService) {}

  @Command("car")
  async onCar(@Ctx() ctx: Context) {
    await this.carService.onCar(ctx);
  }

  @Hears("🚗 Mening mashinalarim")
  async onCommandMyCars(@Ctx() ctx: Context) {
    await this.carService.onCommandMyCars(ctx);
  }

  @Hears("➕ Yangi mashina qo'shish")
  async onCommandNewCar(@Ctx() ctx: Context) {
    await this.carService.onCommandNewCar(ctx);
  }

  @Action(/^delCar_+\d+/)
  async onClickDelCar(@Ctx() ctx: Context) {
    await this.carService.onClickDelCar(ctx);
  }

  @Action(/^editCar_+\d+/)
  async onClickEditCar(@Ctx() ctx: Context) {
    await this.carService.onClickEditCar(ctx);
  }

  @Action(/^editCarNumber_+\d+/)
  async onClickEditCarNumber(@Ctx() ctx: Context) {
    await this.carService.onEditCarField(ctx, "Number");
  }

  @Action(/^editCarModel_+\d+/)
  async onClickEditCarModel(@Ctx() ctx: Context) {
    await this.carService.onEditCarField(ctx, "Model");
  }

  @Action(/^editCarColor_+\d+/)
  async onClickEditCarColor(@Ctx() ctx: Context) {
    await this.carService.onEditCarField(ctx, "Color");
  }

  @Action(/^editCarYear_+\d+/)
  async onClickEditCarYear(@Ctx() ctx: Context) {
    await this.carService.onEditCarField(ctx, "Year");
  }
}
