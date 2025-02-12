import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "./models/category.model";
export declare class CategoryService {
    private categoryModel;
    constructor(categoryModel: typeof Category);
    create(createCategoryDto: CreateCategoryDto): Promise<Category>;
    findAll(): Promise<Category[]>;
    findOne(id: number): Promise<Category | null>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): any;
    remove(id: number): Promise<number>;
}
