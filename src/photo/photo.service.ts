import { Injectable } from "@nestjs/common";
import { CreatePhotoDto } from "./dto/create-photo.dto";
import { UpdatePhotoDto } from "./dto/update-photo.dto";
import { Photo } from "./models/photo.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class PhotoService {
  constructor(
    @InjectModel(Photo)
    private photoModel: typeof Photo
  ) {}
  create(createPhotoDto: CreatePhotoDto) {
    return this.photoModel.create(createPhotoDto);
  }

  findAll() {
    return this.photoModel.findAll();
  }

  findOne(id: number) {
    return this.photoModel.findByPk(id);
  }

  async update(id: number, updatePhotoDto: UpdatePhotoDto) {
    const photo = await this.photoModel.update(updatePhotoDto, {
      where: { id },
      returning: true,
    });
    return photo[1][0];
  }

  remove(id: number) {
    return this.photoModel.destroy({ where: { id } });
  }
}
