import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto): Promise<import("./models/category.model").Category>;
    findAll(): Promise<import("./models/category.model").Category[]>;
    findOne(id: string): Promise<import("./models/category.model").Category | null>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): any;
    remove(id: string): Promise<number>;
}
