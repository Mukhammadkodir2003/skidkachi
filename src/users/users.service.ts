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
import { BotService } from "../bot/bot.service";
import * as otpGenerator from "otp-generator";
import { PhoneUserDto } from "./dto/phone-user.dto";
import { Otp } from "../otp/models/otp.model";
import { AddMinutesToDate } from "../helpers/addMinutes";
import { decode, encode } from "../helpers/crypto";
import { VerifyOtpDto } from "./dto/verify_otp.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users) private readonly usersModel: typeof Users,
    @InjectModel(Otp) private readonly otpModel: typeof Otp,
    private readonly jwtService: JwtService,
    private readonly botService: BotService,
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

  async newOtp(PhoneUserDto: PhoneUserDto) {
    const phone_number = PhoneUserDto.phone;
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const isSent = await this.botService.sendOtp(phone_number, otp);
    if (!isSent) {
      throw new BadRequestException("Avval botdan ro'yxatdan o'ting");
    }

    // ----------SMS----------
    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    await this.otpModel.destroy({ where: { phone_number } });
    const newOtpData = await this.otpModel.create({
      id: uuid.v4(),
      otp,
      phone_number,
      expiration_time,
    });

    const details = {
      timestamp: now,
      phone_number,
      otp_id: newOtpData.id,
    };

    const encodedData = await encode(JSON.stringify(details));

    return {
      message: "OTP botga yuborildi",
      verification_key: encodedData,
    };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { verification_key, phone: phone_number, otp } = verifyOtpDto;

    const currentDate = new Date();
    const decodedData = await decode(verification_key);
    const details = JSON.parse(decodedData);

    if (details.phone_number != phone_number) {
      throw new BadRequestException("Otp bu telefon raqamga yuborilmagan");
    }

    const resultOTP = await this.otpModel.findByPk(details.otp_id);
    if (!resultOTP == null) {
      throw new BadRequestException("Bunday OTP mavjud emas");
    }
    if (resultOTP?.verified) {
      throw new BadRequestException("Bu OTP tasdiqlangan");
    }
    if (resultOTP!.expiration_time < currentDate) {
      throw new BadRequestException("OTP muddati tugagan");
    }
    if (resultOTP?.otp != otp) {
      throw new BadRequestException("OTP kod noto'g'ri");
    }
    const user = await this.usersModel.update(
      { is_owner: true },
      { where: { phone: phone_number }, returning: true }
    );

    if (!user[1][0]) {
      throw new NotFoundException("User topilmadi");
    }

    await this.otpModel.update(
      { verified: true },
      { where: { id: details.otp_id } }
    );

    return {
      message: "Tabriklaymiz, siz owner bo'ldingiz",
    };
  }
}
