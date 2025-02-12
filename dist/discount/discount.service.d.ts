import { CreateDiscountDto } from "./dto/create-discount.dto";
import { UpdateDiscountDto } from "./dto/update-discount.dto";
import { Discount } from "./models/discount.model";
export declare class DiscountService {
    private discountModel;
    constructor(discountModel: typeof Discount);
    create(createDiscountDto: CreateDiscountDto): Promise<Discount>;
    findAll(): Promise<Discount[]>;
    findOne(id: number): Promise<Discount | null>;
    update(id: number, updateDiscountDto: UpdateDiscountDto): Promise<Discount>;
    remove(id: number): Promise<number>;
}
