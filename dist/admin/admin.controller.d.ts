import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    create(createAdminDto: CreateAdminDto): Promise<import("./models/admin.model").Admin>;
    findAll(): Promise<import("./models/admin.model").Admin[]>;
    findOne(id: string): Promise<import("./models/admin.model").Admin | null>;
    update(id: string, updateAdminDto: UpdateAdminDto): any;
    remove(id: string): Promise<number>;
}
