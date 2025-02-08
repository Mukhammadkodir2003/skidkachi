import { Injectable } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Admin } from "./models/admin.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin)
    private adminModel: typeof Admin
  ) {}
  create(createAdminDto: CreateAdminDto) {
    return this.adminModel.create(createAdminDto);
  }

  findAll() {
    return this.adminModel.findAll();
  }

  findOne(id: number) {
    return this.adminModel.findByPk(id);
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = this.adminModel.update(updateAdminDto, {
      where: { id },
      returning: true,
    });
    return admin[1][0];
  }

  remove(id: number) {
    return this.adminModel.destroy({ where: { id } });
  }
}
