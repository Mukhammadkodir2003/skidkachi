import { Context } from "telegraf";
import { AddressService } from "./address.service";
export declare class AddressUpdate {
    private readonly addressService;
    constructor(addressService: AddressService);
    onAddress(ctx: Context): Promise<void>;
    onCommandNewAddress(ctx: Context): Promise<void>;
    onCommandMyAddresses(ctx: Context): Promise<void>;
    onClickLocation(ctx: Context): Promise<void>;
    onClickDelLocation(ctx: Context): Promise<void>;
}
