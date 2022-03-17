import {
  BadRequestException,
  Injectable, InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { MEMBER_GRADE } from '../common/constants';
import { Schedule } from '../schedule/entities/schedule.entity';
import { User } from '../user/entities/user.entity';
import { UpdateGradeDto } from './dto/update-grade.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    private connection: Connection,
  ) {}

  async create(id: number, createMemberDto: CreateMemberDto): Promise<Member> {
    const member = await this.memberRepository.findOne({
      group: +createMemberDto.groupId,
      user: id,
    });
    if (!member || member.grade === MEMBER_GRADE.NORMAL) {
      throw new BadRequestException({
        message: '멤버 가입에 실패하였습니다.',
      });
    }

    const user = await this.userRepository.findOne({
      id: +createMemberDto.userId
    });
    if (!user) {
      throw new NotFoundException({
        message: '존재하지 않는 유저입니다.',
      });
    }

    const isExistedUser = await this.memberRepository.findOne({
      group: +createMemberDto.groupId,
      user: +createMemberDto.userId
    });
    if (isExistedUser) {
      throw new BadRequestException({
        message: '이미 존재하는 유저입니다.',
      });
    }

    const isExistedColor = await this.memberRepository.findOne({
      group: +createMemberDto.groupId,
      color: createMemberDto.color,
    });
    if (isExistedColor) {
      throw new BadRequestException({
        message: '이미 존재하는 색입니다.',
      });
    }

    const newMember = await this.memberRepository.create({
      group: +createMemberDto.groupId,
      user: +createMemberDto.userId,
      grade: MEMBER_GRADE.NORMAL,
      color: createMemberDto.color,
    });

    return await this.memberRepository.save(newMember);
  }

  async update(id: number, updateMemberDto: UpdateMemberDto): Promise<Member> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const member = await this.memberRepository.findOne({
        group: +updateMemberDto.groupId,
        user: id,
      });
      if (!member) {
        throw ('존재하지 않는 유저입니다.');
      }

      member.color = updateMemberDto.color;
      await queryRunner.manager.save(member);

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

      await queryRunner.commitTransaction();
      return member;
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async updateGrade(
    id: number,
    updateGradeDto: UpdateGradeDto,
  ): Promise<Member> {
    const isExistedUser = await this.memberRepository.findOne({
      group: +updateGradeDto.groupId,
      user: +updateGradeDto.userId,
    });
    if (!isExistedUser) {
      throw new NotFoundException({
        message: '존재하지 않는 유저입니다.',
      });
    }

    const member = await this.memberRepository.findOne({
      group: +updateGradeDto.groupId,
      user: id,
    });
    if (!member || member.grade === MEMBER_GRADE.ADMIN) {
      throw new BadRequestException({
        message: '유저 등급 변경 실패했습니다.',
      });
    }

    member.grade = +updateGradeDto.grade;
    await this.memberRepository.save(member);

    return member;
  }

  async remove(id: number, groupId: number): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const member = await this.memberRepository.findOne({
        group: groupId,
        user: id,
      });
      if (!member) {
        throw ('존재하지 않는 유저입니다.');
      }

      if (member.grade === MEMBER_GRADE.MASTER) {
        throw ('그룹장은 그룹을 탈퇴할 수 없습니다.');
      }

      await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(Schedule)
        .where('groupId = :groupId and userId = :userId', { groupId, userId: id })
        .execute();

      await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(Member)
        .where('groupId = :groupId', { groupId })
        .execute();

      await queryRunner.commitTransaction();
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }
}
