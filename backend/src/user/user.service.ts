import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const result = await this.userRepository.findOne(id);
    if (!result) {
      throw new HttpException({
        result: false,
        message: 'not found user'
      }, HttpStatus.NOT_FOUND);
    }
    console.log(result);
    return result;
  }

  async create(createUserDto: CreateUserDto) {
    const existedId = await this.userRepository.findOne({userId: createUserDto.userId});
    if (existedId) {
      throw new HttpException({
        result: false,
        message: 'already existed userId'
      }, HttpStatus.BAD_REQUEST);
    }

    const existedName = await this.userRepository.findOne({nickname: createUserDto.nickname});
    if (existedName) {
      throw new HttpException({
        result: false,
        message: 'already existed nickname'
      }, HttpStatus.BAD_REQUEST);
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    return await this.userRepository.save(createUserDto);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existed = await this.userRepository.findOne({nickname: updateUserDto.nickname});
    if (existed) {
      throw new HttpException({
        result: false,
        message: 'already existed nickname'
      }, HttpStatus.BAD_REQUEST);
    }

    return await this.userRepository.update({id}, updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}
