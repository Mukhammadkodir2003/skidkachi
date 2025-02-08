import {
  BadRequestException,
  ForbiddenException,
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

  async signout(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) {
      throw new ForbiddenException("User not verified");
    }

    const hashed_refresh_token = null;
    await this.userService.updateRefreshToken(
      userData.id,
      hashed_refresh_token
    );

    res.clearCookie("refresh_token");
    const response = {
      message: "User logged out successfully",
    };
    return response;
  }

  async refreshToken(userId: number, refreshToken: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refreshToken);

    if (userId != decodedToken.id) {
      throw new ForbiddenException("Ruxsat etilmagan");
    }
    const user = await this.userService.findOne(userId);

    if (!user || !user.hashed_refresh_token) {
      throw new BadRequestException("User not found");
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      user.hashed_refresh_token
    );

    if (!tokenMatch) {
      throw new ForbiddenException("Forbidden");
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
      message: "Tokenlar yangilandi",
      userId: user.id,
      access_token: tokens.accessToken,
    };

    return response;
  }
}
