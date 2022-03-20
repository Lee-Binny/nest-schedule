import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Res() res) {
    return res.status(HttpStatus.OK).send({
      result: true,
      timestamp: new Date().toISOString(),
      users: await this.userService.findAll(),
    });
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string, @Res() res) {
    return res.status(HttpStatus.OK).send({
      result: true,
      timestamp: new Date().toISOString(),
      user: await this.userService.findOne(+id),
    });
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res) {
    return res.status(HttpStatus.OK).send({
      result: true,
      timestamp: new Date().toISOString(),
      user: await this.userService.create(createUserDto),
    });
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  async update(@Req() req, @Body() updateUserDto: UpdateUserDto, @Res() res) {
    return res.status(HttpStatus.OK).send({
      result: true,
      timestamp: new Date().toISOString(),
      user: await this.userService.update(req.user.id, updateUserDto),
    });
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  async remove(@Req() req, @Res() res) {
    await this.userService.remove(req.user.id);
    return res.status(HttpStatus.OK).send({
      result: true,
      timestamp: new Date().toISOString(),
    });
  }
}
