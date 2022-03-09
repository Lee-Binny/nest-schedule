import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { MEMBER_GRADE } from '../common/constants';
import { Schedule } from '../schedule/entities/schedule.entity';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async create(id: number, createMemberDto: CreateMemberDto): Promise<Member> {
    const isExistedUser = await this.memberRepository.findOne({
      group: createMemberDto.groupId,
      user: id,
    });
    if (isExistedUser) {
      throw new BadRequestException({
        message: '이미 가입된 유저입니다.',
      });
    }

    const isExistedColor = await this.memberRepository.findOne({
      group: createMemberDto.groupId,
      color: createMemberDto.color,
    });
    if (isExistedColor) {
      throw new BadRequestException({
        message: '이미 존재하는 색입니다.',
      });
    }

    const member = await this.memberRepository.create({
      group: createMemberDto.groupId,
      user: id,
      grade: MEMBER_GRADE.NORMAL,
      color: createMemberDto.color,
    });

    return await this.memberRepository.save(member);
  }

  findOne(id: number, groupId: number): Promise<Member> {
    return this.memberRepository.findOne({
      user: id,
      group: groupId,
    });
  }

  async update(id: number, updateMemberDto: UpdateMemberDto): Promise<Member> {
    const member = await this.memberRepository.findOne({
      group: updateMemberDto.groupId,
      user: id,
    });
    if (!member) {
      throw new NotFoundException({
        message: '존재하지 않는 유저입니다.',
      });
    }

    member.color = updateMemberDto.color;
    return this.memberRepository.save(member);
  }

  async updateGrade(
    id: number,
    updateMemberDto: UpdateMemberDto,
  ): Promise<Member> {
    const member = await this.memberRepository.findOne({
      group: updateMemberDto.groupId,
      user: id,
    });
    if (!member) {
      throw new NotFoundException({
        message: '존재하지 않는 유저입니다.',
      });
    }

    member.color = updateMemberDto.color;
    const newMember = await this.memberRepository.save(member);

    await this.scheduleRepository
      .createQueryBuilder()
      .update(Schedule)
      .set({
        color: updateMemberDto.color,
      })
      .where('groupId = :groupId and userId = :userId ', {
        groupId: updateMemberDto.groupId,
        userId: id,
      })
      .execute();

    return newMember;
  }

  async remove(id: number, groupId: number): Promise<void> {
    const member = await this.memberRepository.findOne({
      group: groupId,
      user: id,
    });
    if (!member) {
      throw new NotFoundException({
        message: '존재하지 않는 유저입니다.',
      });
    }
    await this.memberRepository.delete({
      group: groupId,
      user: id,
    });
  }
}
