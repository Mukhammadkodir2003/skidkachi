import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";
import { District } from "./model/district.model";
import { FileAmazonService } from "../file-amazon/file-amazon.service";
export declare class DistrictService {
    private districtModel;
    private readonly fileAmazonService;
    constructor(districtModel: typeof District, fileAmazonService: FileAmazonService);
    create(createDistrictDto: CreateDistrictDto, image: Express.Multer.File): Promise<District | undefined>;
    findAll(): Promise<District[]>;
    findOne(id: number): Promise<District | null>;
    update(id: number, updateDistrictDto: UpdateDistrictDto): Promise<[affectedCount: number, affectedRows: District[]]>;
    remove(id: number): Promise<number>;
}
