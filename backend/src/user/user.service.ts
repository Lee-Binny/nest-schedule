import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import { SignInUserDto } from "./dto/sign-in-user.dto";

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const result = await this.userRepository.findOne(id);
    if (!result) {
      throw new NotFoundException({
        result: false,
        message: 'not found user'
      });
    }

    return result;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const isExistedId = await this.userRepository.findOne({userId: createUserDto.userId});
    if (isExistedId) {
      throw new BadRequestException({
        result: false,
        message: `already existed userId ${createUserDto.userId}`
      });
    }

    const isExistedName = await this.userRepository.findOne({nickname: createUserDto.nickname});
    if (isExistedName) {
      throw new BadRequestException({
        result: false,
        message: `already existed nickname ${createUserDto.nickname}`
      });
    }

    const user = await this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const existed = await this.userRepository.findOne({nickname: updateUserDto.nickname});
    if (existed) {
      throw new NotFoundException({
        result: false,
        message: 'already existed nickname'
      });
    }

    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException({
        result: false,
        message: 'not found user'
      });
    }

    user.nickname = updateUserDto.nickname;
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException({
        result: false,
        message: 'not found user'
      });
    }

    await this.userRepository.delete(id);
  }
}
