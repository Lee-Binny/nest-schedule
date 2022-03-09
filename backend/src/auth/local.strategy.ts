import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDto } from "./dto/sign-in-user.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'userId',
    });
  }

  async validate(userId: string, password: string): Promise<any> {
    const signInUserDto: SignInUserDto = {
      userId,
      password,
    };

    const user = await this.authService.validateUser(signInUserDto);
    if (!user) {
      throw new UnauthorizedException({
        result: false,
        message: 'unauthorized',
      });
    }

    return user;
  }
}