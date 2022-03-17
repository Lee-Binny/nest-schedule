import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Schedule } from '../schedule/entities/schedule.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Member, Schedule])],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
