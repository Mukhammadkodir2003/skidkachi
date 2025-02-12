import { CreateStoreDto } from "./dto/create-store.dto";
import { UpdateStoreDto } from "./dto/update-store.dto";
import { Store } from "./models/store.model";
export declare class StoreService {
    private storeModel;
    constructor(storeModel: typeof Store);
    create(createStoreDto: CreateStoreDto): Promise<Store>;
    findAll(): Promise<Store[]>;
    findOne(id: number): Promise<Store | null>;
    update(id: number, updateStoreDto: UpdateStoreDto): Promise<Store>;
    remove(id: number): Promise<number>;
}
