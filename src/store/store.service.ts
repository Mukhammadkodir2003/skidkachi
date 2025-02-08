import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateStoreDto } from "./dto/create-store.dto";
import { UpdateStoreDto } from "./dto/update-store.dto";
import { Store } from "./models/store.model";

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store)
    private storeModel: typeof Store
  ) {}

  create(createStoreDto: CreateStoreDto) {
    return this.storeModel.create(createStoreDto);
  }

  findAll() {
    return this.storeModel.findAll({
      include: { all: true },
    });
  }

  findOne(id: number) {
    return this.storeModel.findByPk(id, {
      include: { all: true },
    });
  }

  async update(id: number, updateStoreDto: UpdateStoreDto) {
    const store = await this.storeModel.update(updateStoreDto, {
      where: { id },
      returning: true,
    });
    return store[1][0];
  }

  remove(id: number) {
    return this.storeModel.destroy({ where: { id } });
  }
}
