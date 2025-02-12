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
import { AddressService } from "./address.service";

@Update()
export class AddressUpdate {
  constructor(private readonly addressService: AddressService) {}

  @Command("address")
  async onAddress(@Ctx() ctx: Context) {
    await this.addressService.onAddress(ctx);
  }

  @Hears("Yangi manzil qo'shish")
  async onCommandNewAddress(@Ctx() ctx: Context) {
    await this.addressService.onCommandNewAddress(ctx);
  }

  @Hears("Mening manzillarim")
  async onCommandMyAddresses(@Ctx() ctx: Context) {
    await this.addressService.onCommandMyAddresses(ctx);
  }

  @On("location")
  async onCommandNearAddresses(@Ctx() ctx: Context) {
    await this.addressService.onCommandNearAddresses;
  }

  @Action(/^getLoc_+\d+/)
  async onClickLocation(@Ctx() ctx: Context) {
    await this.addressService.onClickLocation(ctx);
  }

  @Action(/^delLoc_+\d+/)
  async onClickDelLocation(@Ctx() ctx: Context) {
    await this.addressService.onClickDelLocation(ctx);
  }
}
