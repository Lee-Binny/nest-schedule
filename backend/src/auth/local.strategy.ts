import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDto } from "../user/dto/sign-in-user.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'userId',
    });
  }

  async validate(userId: string, password: string): Promise<any> {
    const signInUserDto = {
      userId,
      password,
    };

    const user = await this.authService.validateUser(signInUserDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}