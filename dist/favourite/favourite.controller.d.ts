import { FavouriteService } from "./favourite.service";
import { CreateFavouriteDto } from "./dto/create-favourite.dto";
import { UpdateFavouriteDto } from "./dto/update-favourite.dto";
import { Favourite } from "./models/favourite.model";
export declare class FavouriteController {
    private readonly favouriteService;
    constructor(favouriteService: FavouriteService);
    create(createFavouriteDto: CreateFavouriteDto): Promise<Favourite>;
    findAll(): Promise<Favourite[]>;
    findOne(id: string): Promise<Favourite | null>;
    update(id: string, updateFavouriteDto: UpdateFavouriteDto): Promise<[affectedCount: number, affectedRows: Favourite[]]>;
    remove(id: string): Promise<number>;
}
