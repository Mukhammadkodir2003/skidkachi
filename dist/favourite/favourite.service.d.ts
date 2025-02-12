import { CreateFavouriteDto } from "./dto/create-favourite.dto";
import { UpdateFavouriteDto } from "./dto/update-favourite.dto";
import { Favourite } from "./models/favourite.model";
export declare class FavouriteService {
    private favouriteModel;
    constructor(favouriteModel: typeof Favourite);
    create(createFavouriteDto: CreateFavouriteDto): Promise<Favourite>;
    findAll(): Promise<Favourite[]>;
    findOne(id: number): Promise<Favourite | null>;
    update(id: number, updateFavouriteDto: UpdateFavouriteDto): Promise<[affectedCount: number, affectedRows: Favourite[]]>;
    remove(id: number): Promise<number>;
}
