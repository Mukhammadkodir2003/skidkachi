import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { AuthLoginDto } from "./dto/auth-login.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    const tokens = await this.userService.getTokens(user);

    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);

    await this.userService.update(user.id, {
      ...createUserDto,
      hashed_refresh_token: hashed_refresh_token,
    });

    return tokens;
  }

  async signin(authLoginDto: AuthLoginDto) {
    const { email, password } = authLoginDto;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException("User not registered");
    }

    const isMatchPass = await bcrypt.compare(password, user.hashed_password);
    if (!isMatchPass) {
      throw new UnauthorizedException("User not registered");
    }

    const tokens = await this.userService.getTokens(user);

    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);

    await this.userService.update(user.id, {
      hashed_refresh_token: hashed_refresh_token,
      name: "",
      phone: "",
      email: "",
    });

    return tokens;
  }
}
