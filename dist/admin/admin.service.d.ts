import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Admin } from "./models/admin.model";
export declare class AdminService {
    private adminModel;
    constructor(adminModel: typeof Admin);
    create(createAdminDto: CreateAdminDto): Promise<Admin>;
    findAll(): Promise<Admin[]>;
    findOne(id: number): Promise<Admin | null>;
    update(id: number, updateAdminDto: UpdateAdminDto): any;
    remove(id: number): Promise<number>;
}
