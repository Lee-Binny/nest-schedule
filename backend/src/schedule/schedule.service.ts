import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { Repository } from 'typeorm';
import { Member } from '../member/entities/member.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,

    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async create(
    id: number,
    createScheduleDto: CreateScheduleDto,
  ): Promise<Schedule> {
    const member = await this.memberRepository.findOne({
      user: id,
      group: createScheduleDto.groupId,
    });
    if (!member) {
      throw new BadRequestException({
        message: '존재하지 않는 그룹 멤버입니다.',
      });
    }

    const schedule = await this.scheduleRepository.create({
      user: id,
      group: createScheduleDto.groupId,
      title: createScheduleDto.title,
      color: member.color,
      startAt: createScheduleDto.startAt,
      endAt: createScheduleDto.endAt,
    });

    return await this.scheduleRepository.save(schedule);
  }

  async update(
    id: number,
    scheduleId: number,
    updateScheduleDto: UpdateScheduleDto,
  ): Promise<Schedule> {
    const schedule = await this.scheduleRepository.findOne(id);
    if (!schedule) {
      throw new NotFoundException({
        message: '존재하지 않는 스케줄입니다.',
      });
    }

    schedule.title = updateScheduleDto.title;
    schedule.startAt = updateScheduleDto.startAt;
    schedule.endAt = updateScheduleDto.endAt;
    return this.scheduleRepository.save(schedule);
  }

  async remove(id: number, scheduleId: number): Promise<void> {
    const schedule = await this.scheduleRepository.findOne(id);
    if (!schedule) {
      throw new NotFoundException({
        message: '존재하지 않는 스케줄입니다.',
      });
    }

    if (schedule.user !== id) {
      throw new BadRequestException({
        message: '스케줄을 삭제할 수 없습니다.',
      });
    }

    await this.scheduleRepository.delete(scheduleId);
  }
}
