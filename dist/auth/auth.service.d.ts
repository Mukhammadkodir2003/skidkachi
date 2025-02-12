import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { Response } from "express";
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    signup(createUserDto: CreateUserDto): Promise<{
        message: string;
        userId: number;
    }>;
    signin(authLoginDto: AuthLoginDto, res: Response): Promise<{
        message: string;
        userId: number;
        access_token: string;
    }>;
    signout(refreshToken: string, res: Response): Promise<{
        message: string;
    }>;
    refreshToken(userId: number, refreshToken: string, res: Response): Promise<{
        message: string;
        userId: number;
        access_token: string;
    }>;
}
