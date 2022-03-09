import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { Member } from '../member/entities/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, Member])],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
