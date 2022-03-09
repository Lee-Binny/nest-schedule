import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Member } from './entities/member.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Member]),
  ],
  controllers: [MemberController],
  providers: [MemberService]
})
export class MemberModule {}
