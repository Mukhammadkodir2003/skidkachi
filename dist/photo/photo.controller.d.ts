import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
export declare class PhotoController {
    private readonly photoService;
    constructor(photoService: PhotoService);
    create(createPhotoDto: CreatePhotoDto): Promise<import("./models/photo.model").Photo>;
    findAll(): Promise<import("./models/photo.model").Photo[]>;
    findOne(id: string): Promise<import("./models/photo.model").Photo | null>;
    update(id: string, updatePhotoDto: UpdatePhotoDto): Promise<import("./models/photo.model").Photo>;
    remove(id: string): Promise<number>;
}
