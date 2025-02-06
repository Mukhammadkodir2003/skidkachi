import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Yangi foydalanuvchini ro'yxatdan o'tkazish" })
  @ApiResponse({
    status: 201,
    description: "Ro'yxatdan o'tgan foydalanuvchi",
    type: String,
  })
  @Post("signup")
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @ApiOperation({ summary: "Tizimga kirish" })
  @HttpCode(HttpStatus.OK)
  @Post("signin")
  async signin(
    @Body() authLoginDto: AuthLoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signin(authLoginDto, res);
  }
}
