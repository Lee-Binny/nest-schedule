import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
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
    // TODO error 확인하기
    if (!result) {
      throw new HttpException({
        result: false,
        message: 'not found user'
      }, HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const isExistedId = await this.userRepository.findOne({userId: createUserDto.userId});
    if (isExistedId) {
      throw new HttpException({
        result: false,
        message: `already existed userId ${createUserDto.userId}`
      }, HttpStatus.BAD_REQUEST);
    }

    const isExistedName = await this.userRepository.findOne({nickname: createUserDto.nickname});
    if (isExistedName) {
      throw new HttpException({
        result: false,
        message: `already existed nickname ${createUserDto.nickname}`
      }, HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async signIn(signInUser: SignInUserDto): Promise<void> {
    const user = await this.userRepository.findOne({userId: signInUser.userId});
    if (!user) {
      throw new HttpException({
        result: false,
        message: `not found userId ${signInUser.userId}`
      }, HttpStatus.NOT_FOUND);
    }

    const isMatch = await bcrypt.compare(signInUser.password, user.password);
    if (!isMatch) {
      throw new HttpException({
        result: false,
        message: `failed to sign in`
      }, HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const existed = await this.userRepository.findOne({nickname: updateUserDto.nickname});
    if (existed) {
      throw new HttpException({
        result: false,
        message: 'already existed nickname'
      }, HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new HttpException({
        result: false,
        message: 'not found user'
      }, HttpStatus.NOT_FOUND);
    }

    user.nickname = updateUserDto.nickname;
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new HttpException({
        result: false,
        message: 'not found user'
      }, HttpStatus.NOT_FOUND);
    }

    await this.userRepository.delete(id);
  }
}
