import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
export declare class StoreController {
    private readonly storeService;
    constructor(storeService: StoreService);
    create(createStoreDto: CreateStoreDto): Promise<import("./models/store.model").Store>;
    findAll(): Promise<import("./models/store.model").Store[]>;
    findOne(id: string): Promise<import("./models/store.model").Store | null>;
    update(id: string, updateStoreDto: UpdateStoreDto): Promise<import("./models/store.model").Store>;
    remove(id: string): Promise<number>;
}
