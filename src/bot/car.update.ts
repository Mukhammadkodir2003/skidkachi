import { Action, Command, Ctx, Hears, On, Update } from "nestjs-telegraf";
import { Context } from "telegraf";
import { CarService } from "./car.service";

@Update()
export class CarUpdate {
  constructor(private readonly carService: CarService) {}

  @Command("car")
  async onCar(@Ctx() ctx: Context) {
    await this.carService.onCar(ctx);
  }

  @Hears("Yangi avtomobil qo'shish")
  async onCommandNewCar(@Ctx() ctx: Context) {
    await this.carService.onCommandNewCar(ctx);
  }

  @Hears("Mening avtomobillarim")
  async onCommandMyCares(@Ctx() ctx: Context) {
    await this.carService.onCommandMyCares(ctx);
  }

  @Action(/^delCar_+\d+/)
  async onClickDelCar(@Ctx() ctx: Context) {
    await this.carService.onClickDelCar(ctx);
  }

  @On("text")
  async onText(@Ctx() ctx: Context) {
    await this.carService.onText(ctx);
  }
}
