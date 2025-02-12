import { RegionService } from "./region.service";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
export declare class RegionController {
    private readonly regionService;
    constructor(regionService: RegionService);
    create(createRegionDto: CreateRegionDto, image: Express.Multer.File): Promise<import("./model/region.model").Region | undefined>;
    findAll(): Promise<import("./model/region.model").Region[]>;
    findOne(id: string): Promise<import("./model/region.model").Region | null>;
    update(id: string, updateRegionDto: UpdateRegionDto): Promise<[affectedCount: number, affectedRows: import("./model/region.model").Region[]]>;
    remove(id: string): Promise<number>;
}
