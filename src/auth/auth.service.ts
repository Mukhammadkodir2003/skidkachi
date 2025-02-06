import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { AuthLoginDto } from "./dto/auth-login.dto";
import * as bcrypt from "bcrypt";
import { Response } from "express";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const candidate = await this.userService.findByEmail(createUserDto.email);
    if (candidate) {
      throw new BadRequestException("Bunday foydalanuvchi mavjud");
    }
    const user = await this.userService.create(createUserDto);
    const response = {
      message:
        "Tabriklayman! " +
        "Tizimga muvaffaqiyatli qo'shildingiz. " +
        "Akkauntni faollashtirish uchun emailga yuborilgan xabarni tasdiqlang",
      userId: user.id,
    };
    return response;
  }

  async signin(authLoginDto: AuthLoginDto, res: Response) {
    const { email, password } = authLoginDto;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException("User ro'yxatdan o'tmagan");
    }

    const isMatchPass = await bcrypt.compare(password, user.hashed_password);
    if (!isMatchPass) {
      throw new UnauthorizedException("User ro'yxatdan o'tmagan");
    }

    const tokens = await this.userService.getTokens(user);

    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);

    const updatedUser = await this.userService.updateRefreshToken(
      user.id,
      hashed_refresh_token
    );
    if (!updatedUser) {
      throw new InternalServerErrorException("Tokenni saqlashda xatolik");
    }

    res.cookie("refresh_token", tokens.refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    const response = {
      message: "Tizimga kirildi",
      userId: user.id,
      access_token: tokens.accessToken,
    };

    return response;
  }
}
