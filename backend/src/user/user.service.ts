import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

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
        message: '존재하지 않는 유저입니다.'
      });
    }

    return result;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const isExistedId = await this.userRepository.findOne({userId: createUserDto.userId});
    if (isExistedId) {
      throw new BadRequestException({
        message: `이미 존재하는 아이디입니다.`
      });
    }

    const isExistedName = await this.userRepository.findOne({nickname: createUserDto.nickname});
    if (isExistedName) {
      throw new BadRequestException({
        message: `이미 존재하는 닉네임입니다.`
      });
    }

    const user = await this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const existed = await this.userRepository.findOne({nickname: updateUserDto.nickname});
    if (existed) {
      throw new NotFoundException({
        message: '이미 존재하는 닉네임입니다.'
      });
    }

    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException({
        message: '존재하지 않는 유저입니다.'
      });
    }

    user.nickname = updateUserDto.nickname;
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException({
        message: '존재하지 않는 유저입니다.'
      });
    }

    await this.userRepository.delete(id);
  }
}
