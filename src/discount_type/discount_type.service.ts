import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateDiscountTypeDto } from "./dto/create-discount_type.dto";
import { UpdateDiscountTypeDto } from "./dto/update-discount_type.dto";
import { DiscountType } from "./models/discount_type.model";

@Injectable()
export class DiscountTypeService {
  constructor(
    @InjectModel(DiscountType)
    private discountTypeModel: typeof DiscountType
  ) {}

  create(createDiscountTypeDto: CreateDiscountTypeDto) {
    return this.discountTypeModel.create(createDiscountTypeDto);
  }

  findAll() {
    return this.discountTypeModel.findAll();
  }

  findOne(id: number) {
    return this.discountTypeModel.findByPk(id);
  }

  async update(id: number, updateDiscountTypeDto: UpdateDiscountTypeDto) {
    const discountType = await this.discountTypeModel.update(
      updateDiscountTypeDto,
      {
        where: { id },
        returning: true,
      }
    );
    return discountType[1][0];
  }

  remove(id: number) {
    return this.discountTypeModel.destroy({ where: { id } });
  }
}
