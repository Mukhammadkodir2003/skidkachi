import { CreatePhotoDto } from "./dto/create-photo.dto";
import { UpdatePhotoDto } from "./dto/update-photo.dto";
import { Photo } from "./models/photo.model";
export declare class PhotoService {
    private photoModel;
    constructor(photoModel: typeof Photo);
    create(createPhotoDto: CreatePhotoDto): Promise<Photo>;
    findAll(): Promise<Photo[]>;
    findOne(id: number): Promise<Photo | null>;
    update(id: number, updatePhotoDto: UpdatePhotoDto): Promise<Photo>;
    remove(id: number): Promise<number>;
}
