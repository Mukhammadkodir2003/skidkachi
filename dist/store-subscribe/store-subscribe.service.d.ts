import { CreateStoreSubscribeDto } from "./dto/create-store-subscribe.dto";
import { UpdateStoreSubscribeDto } from "./dto/update-store-subscribe.dto";
import { StoreSubscribe } from "./models/store-subscribe.model";
export declare class StoreSubscribeService {
    private storeSubscribeModel;
    constructor(storeSubscribeModel: typeof StoreSubscribe);
    create(createStoreSubscribeDto: CreateStoreSubscribeDto): Promise<StoreSubscribe>;
    findAll(): Promise<StoreSubscribe[]>;
    findOne(id: number): Promise<StoreSubscribe | null>;
    update(id: number, updateStoreSubscribeDto: UpdateStoreSubscribeDto): Promise<StoreSubscribe>;
    remove(id: number): Promise<number>;
}
