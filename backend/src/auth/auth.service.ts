import { ForbiddenException, Injectable } from '@nestjs/common';
import { SignInUserDto } from './dto/sign-in-user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(signInUser: SignInUserDto): Promise<any> {
    const user = await this.userRepository.findOne({
      userId: signInUser.userId,
    });
    if (!user || !(await bcrypt.compare(signInUser.password, user.password))) {
      throw new ForbiddenException({
        message: '로그인에 실패하였습니다.',
      });
    }

    const payload = {
      id: user.id,
      userId: user.userId,
    };

    const token = await this.jwtService.sign(payload);
    const { password, ...result } = user;
    return { ...result, token };
  }
}
