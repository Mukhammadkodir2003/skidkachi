import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { Response } from "express";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    refresh(id: number, refreshToken: string, res: Response): Promise<{
        message: string;
        userId: number;
        access_token: string;
    }>;
}
