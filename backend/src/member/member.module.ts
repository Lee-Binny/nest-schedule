import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Schedule } from '../schedule/entities/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member, Schedule])],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
