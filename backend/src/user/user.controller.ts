import { Controller, Get, Post, Body, Param, Delete, Put, Res, HttpStatus, UseGuards } from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInUserDto } from "./dto/sign-in-user.dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Res() res) {
    return res.status(HttpStatus.OK).send({
      result: true,
      users: await this.userService.findAll()
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    return res.status(HttpStatus.OK).send({
      result: true,
      user: await this.userService.findOne(+id)
    });
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res) {
    return res.status(HttpStatus.OK).send({
      result: true,
      user: await this.userService.create(createUserDto)
    });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() res) {
    return res.status(HttpStatus.OK).send({
      result: true,
      user: await this.userService.update(+id, updateUserDto)
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res) {
    await this.userService.remove(+id);
    return res.status(HttpStatus.OK).send({
      result: true,
    });
  }
}
