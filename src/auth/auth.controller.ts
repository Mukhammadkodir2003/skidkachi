import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Register user" })
  @ApiResponse({ status: 201, description: "Successfully registered" })
  @Post("signup")
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @ApiOperation({ summary: "Login user" })
  @ApiResponse({ status: 200, description: "Successfully logged in" })
  @Post("signin")
  signin(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.signin(authLoginDto);
  }
}
