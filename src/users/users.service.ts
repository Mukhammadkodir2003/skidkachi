import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Users } from "./models/user.model";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import * as uuid from "uuid";
import { MailService } from "../mail/mail.service";
import { FindUserDto } from "./dto/find-user.dto";
import { Op } from "sequelize";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users) private readonly usersModel: typeof Users,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {}

  async getTokens(user: Users) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      is_owner: user.is_owner,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.password !== createUserDto.confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }
    const hashed_password = await bcrypt.hash(createUserDto.password, 7);

    const activation_link = uuid.v4();

    const new_user = await this.usersModel.create({
      ...createUserDto,
      hashed_password,
      activation_link,
    });

    try {
      await this.mailService.sendMail(new_user);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException("Xat yuborishda xatolik");
    }

    return new_user;
  }

  findAll() {
    return this.usersModel.findAll();
  }

  findOne(id: number) {
    return this.usersModel.findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.usersModel.findOne({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersModel.update(updateUserDto, {
      where: { id },
      returning: true,
    });
    return user[1][0];
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string | null) {
    const user = await this.usersModel.update(
      { hashed_refresh_token },
      { where: { id } }
    );
    return user;
  }

  remove(id: number) {
    return this.usersModel.destroy({ where: { id } });
  }

  async activate(activation_link: string) {
    const oldUser = await this.usersModel.findOne({
      where: { activation_link },
    });

    if (!oldUser) {
      throw new NotFoundException("User yoki activation link topilmadi");
    }

    if (oldUser.is_active) {
      throw new ConflictException("User avval aktivlashtirilgan");
    }

    const user = await this.usersModel.update(
      { is_active: true },
      { where: { activation_link }, returning: true }
    );

    const response = {
      message: "User muvaffaqiyatli aktivlashtirildi",
      user: user[1][0].is_active,
    };

    return response;
  }

  async findUser(findUserDto: FindUserDto) {
    const { name, email, phone } = findUserDto;
    const where = {};
    if (name) {
      where["name"] = {
        [Op.like]: `%${name}%`,
      };
    }
    if (email) {
      where["email"] = {
        [Op.like]: `%${email}%`,
      };
    }
    if (phone) {
      where["phone"] = {
        [Op.like]: `%${phone}%`,
      };
    }

    console.log(where);

    const users = await this.usersModel.findAll({ where });
    if (!users) {
      throw new NotFoundException("Users not found");
    }
    return users;
  }
}
