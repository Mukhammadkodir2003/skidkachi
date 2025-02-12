import { CreateDiscountTypeDto } from "./dto/create-discount_type.dto";
import { UpdateDiscountTypeDto } from "./dto/update-discount_type.dto";
import { DiscountType } from "./models/discount_type.model";
export declare class DiscountTypeService {
    private discountTypeModel;
    constructor(discountTypeModel: typeof DiscountType);
    create(createDiscountTypeDto: CreateDiscountTypeDto): Promise<DiscountType>;
    findAll(): Promise<DiscountType[]>;
    findOne(id: number): Promise<DiscountType | null>;
    update(id: number, updateDiscountTypeDto: UpdateDiscountTypeDto): Promise<DiscountType>;
    remove(id: number): Promise<number>;
}
