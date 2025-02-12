import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { Region } from "./model/region.model";
import { FileService } from "../file/file.service";
import { FileAmazonService } from "../file-amazon/file-amazon.service";
export declare class RegionService {
    private regionmodel;
    private readonly fileService;
    private readonly fileAmazonService;
    constructor(regionmodel: typeof Region, fileService: FileService, fileAmazonService: FileAmazonService);
    create(createRegionDto: CreateRegionDto, image: Express.Multer.File): Promise<Region | undefined>;
    findAll(): Promise<Region[]>;
    findOne(id: number): Promise<Region | null>;
    update(id: number, updateRegionDto: UpdateRegionDto): Promise<[affectedCount: number, affectedRows: Region[]]>;
    remove(id: number): Promise<number>;
}
