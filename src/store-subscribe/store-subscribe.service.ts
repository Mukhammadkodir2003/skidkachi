import { Injectable } from "@nestjs/common";
import { CreateStoreSubscribeDto } from "./dto/create-store-subscribe.dto";
import { UpdateStoreSubscribeDto } from "./dto/update-store-subscribe.dto";
import { StoreSubscribe } from "./models/store-subscribe.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class StoreSubscribeService {
  constructor(
    @InjectModel(StoreSubscribe)
    private storeSubscribeModel: typeof StoreSubscribe
  ) {}
  create(createStoreSubscribeDto: CreateStoreSubscribeDto) {
    return this.storeSubscribeModel.create(createStoreSubscribeDto);
  }

  findAll() {
    return this.storeSubscribeModel.findAll();
  }

  findOne(id: number) {
    return this.storeSubscribeModel.findByPk(id);
  }

  async update(id: number, updateStoreSubscribeDto: UpdateStoreSubscribeDto) {
    const storeSubscribe = await this.storeSubscribeModel.update(
      updateStoreSubscribeDto,
      {
        where: { id },
        returning: true,
      }
    );

    return storeSubscribe[1][0];
  }

  remove(id: number) {
    return this.storeSubscribeModel.destroy({ where: { id } });
  }
}
