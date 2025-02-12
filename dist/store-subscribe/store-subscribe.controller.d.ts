import { StoreSubscribeService } from './store-subscribe.service';
import { CreateStoreSubscribeDto } from './dto/create-store-subscribe.dto';
import { UpdateStoreSubscribeDto } from './dto/update-store-subscribe.dto';
export declare class StoreSubscribeController {
    private readonly storeSubscribeService;
    constructor(storeSubscribeService: StoreSubscribeService);
    create(createStoreSubscribeDto: CreateStoreSubscribeDto): Promise<import("./models/store-subscribe.model").StoreSubscribe>;
    findAll(): Promise<import("./models/store-subscribe.model").StoreSubscribe[]>;
    findOne(id: string): Promise<import("./models/store-subscribe.model").StoreSubscribe | null>;
    update(id: string, updateStoreSubscribeDto: UpdateStoreSubscribeDto): Promise<import("./models/store-subscribe.model").StoreSubscribe>;
    remove(id: string): Promise<number>;
}
