import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateSocialLinkDto } from "./dto/create-social_link.dto";
import { UpdateSocialLinkDto } from "./dto/update-social_link.dto";
import { SocialLink } from "./models/social_link.model";

@Injectable()
export class SocialLinkService {
  constructor(
    @InjectModel(SocialLink)
    private socialLinkModel: typeof SocialLink
  ) {}

  create(createSocialLinkDto: CreateSocialLinkDto) {
    return this.socialLinkModel.create(createSocialLinkDto);
  }

  findAll() {
    return this.socialLinkModel.findAll({
      include: { all: true },
    });
  }

  findOne(id: number) {
    return this.socialLinkModel.findByPk(id, {
      include: { all: true },
    });
  }

  async update(id: number, updateSocialLinkDto: UpdateSocialLinkDto) {
    const socialLink = await this.socialLinkModel.update(updateSocialLinkDto, {
      where: { id },
      returning: true,
    });
    return socialLink[1][0];
  }

  remove(id: number) {
    return this.socialLinkModel.destroy({ where: { id } });
  }
}
