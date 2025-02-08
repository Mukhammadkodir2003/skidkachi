import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserGuard } from "../guards/user.guard";
import { UserSelfGuard } from "../guards/userSelf.guard";
import { FindUserDto } from "./dto/find-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(UserGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @HttpCode(200)
  @Post("find-user")
  findUser(@Body() findUserDto: FindUserDto) {
    return this.usersService.findUser(findUserDto);
  }

  @Get(":id")
  @UseGuards(UserSelfGuard)
  @UseGuards(UserGuard)
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(UserSelfGuard)
  @UseGuards(UserGuard)
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  @UseGuards(UserSelfGuard)
  @UseGuards(UserGuard)
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }

  @Get("activate/:id")
  activate(@Param("id") id: string) {
    return this.usersService.activate(id);
  }
}
