import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
export declare class DiscountController {
    private readonly discountService;
    constructor(discountService: DiscountService);
    create(createDiscountDto: CreateDiscountDto): Promise<import("./models/discount.model").Discount>;
    findAll(): Promise<import("./models/discount.model").Discount[]>;
    findOne(id: string): Promise<import("./models/discount.model").Discount | null>;
    update(id: string, updateDiscountDto: UpdateDiscountDto): Promise<import("./models/discount.model").Discount>;
    remove(id: string): Promise<number>;
}
