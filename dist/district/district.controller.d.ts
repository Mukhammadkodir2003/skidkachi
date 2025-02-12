import { DistrictService } from "./district.service";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";
export declare class DistrictController {
    private readonly districtService;
    constructor(districtService: DistrictService);
    create(createDistrictDto: CreateDistrictDto, image: Express.Multer.File): Promise<import("./model/district.model").District | undefined>;
    findAll(): Promise<import("./model/district.model").District[]>;
    findOne(id: string): Promise<import("./model/district.model").District | null>;
    update(id: string, updateDistrictDto: UpdateDistrictDto): Promise<[affectedCount: number, affectedRows: import("./model/district.model").District[]]>;
    remove(id: string): Promise<number>;
}
