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
import { JwtAuthGuard } from '../../dist/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Res() res) {
    return res.status(HttpStatus.OK).send({
      result: true,
      timestamp: new Date().toISOString(),
      users: await this.userService.findAll(),
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  async update(@Req() req, @Body() updateUserDto: UpdateUserDto, @Res() res) {
    return res.status(HttpStatus.OK).send({
      result: true,
      timestamp: new Date().toISOString(),
      user: await this.userService.update(req.user.id, updateUserDto),
    });
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async remove(@Req() req, @Res() res) {
    await this.userService.remove(req.user.id);
    return res.status(HttpStatus.OK).send({
      result: true,
      timestamp: new Date().toISOString(),
    });
  }
}
