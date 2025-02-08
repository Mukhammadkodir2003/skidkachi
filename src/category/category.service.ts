import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "./models/category.model";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private categoryModel: typeof Category
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryModel.create(createCategoryDto);
  }

  findAll() {
    return this.categoryModel.findAll({
      include: { all: true },
    });
  }

  findOne(id: number) {
    return this.categoryModel.findByPk(id, {
      include: { all: true },
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = this.categoryModel.update(updateCategoryDto, {
      where: { id },
      returning: true,
    });
    return category[1][0];
  }

  remove(id: number) {
    return this.categoryModel.destroy({ where: { id } });
  }
}
