import { DiscountTypeService } from './discount_type.service';
import { CreateDiscountTypeDto } from './dto/create-discount_type.dto';
import { UpdateDiscountTypeDto } from './dto/update-discount_type.dto';
export declare class DiscountTypeController {
    private readonly discountTypeService;
    constructor(discountTypeService: DiscountTypeService);
    create(createDiscountTypeDto: CreateDiscountTypeDto): Promise<import("./models/discount_type.model").DiscountType>;
    findAll(): Promise<import("./models/discount_type.model").DiscountType[]>;
    findOne(id: string): Promise<import("./models/discount_type.model").DiscountType | null>;
    update(id: string, updateDiscountTypeDto: UpdateDiscountTypeDto): Promise<import("./models/discount_type.model").DiscountType>;
    remove(id: string): Promise<number>;
}
