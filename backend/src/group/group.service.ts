import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Member } from '../member/entities/member.entity';
import { MEMBER_GRADE } from '../common/constants';
import { Schedule } from '../schedule/entities/schedule.entity';
import { JoinGroupDto } from './dto/join-group.dto';

interface ResCreateGroup {
  readonly group: Group;
  readonly member: Member;
}

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,

    @InjectRepository(Member)
    private memberRepository: Repository<Member>,

    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,

    private connection: Connection,
  ) {}

  async create(
    id: number,
    createGroupDto: CreateGroupDto,
  ): Promise<ResCreateGroup> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const isExisted = await this.groupRepository.findOne({
        name: createGroupDto.name,
      });
      if (isExisted) {
        throw `이미 존재하는 이름입니다.`;
      }

      const group = await this.groupRepository.create(createGroupDto);
      await queryRunner.manager.save(group);

      const member = await this.memberRepository.create({
        group: group.id,
        user: id,
        grade: MEMBER_GRADE.MASTER,
        color: createGroupDto.myColor,
      });

      await queryRunner.manager.save(member);
      await queryRunner.commitTransaction();
      return { group, member };
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  getMyGroups(id: number): Promise<Group[]> {
    return this.groupRepository
      .createQueryBuilder('group')
      .innerJoinAndMapOne(
        'group.id',
        Member,
        'member',
        'group.id = member.groupId',
      )
      .where('member.userId = :userId', { userId: id })
      .getMany();
  }

  async searchByName(name: string): Promise<Group[]> {
    return await this.groupRepository
      .createQueryBuilder('group')
      .where('group.name like :name', { name: `%${name}%` })
      .orderBy('group.createdAt', 'DESC')
      .getMany();
  }

  async join(
    id: number,
    groupId: number,
    joinGroupDto: JoinGroupDto,
  ): Promise<Member> {
    const group = await this.groupRepository.findOne(groupId);
    if (!group) {
      throw new NotFoundException({
        message: `존재하지 않는 그룹입니다.`,
      });
    }

    const alreadyJoined = await this.memberRepository.findOne({
      where: {
        group: groupId,
        user: id,
      }
    });
    if (alreadyJoined) {
      throw new BadRequestException({
        message: `이미 가입 그룹입니다.`,
      });
    }

    const newMember = await this.memberRepository.create({
      group: group.id,
      user: id,
      grade: MEMBER_GRADE.NORMAL,
      color: joinGroupDto.color,
    });
    return await this.memberRepository.save(newMember);
  }

  async getSchedules(groupId: number): Promise<Schedule[]> {
    const group = await this.groupRepository.findOne(groupId);
    if (!group) {
      throw new NotFoundException({
        message: `존재하지 않는 그룹입니다.`,
      });
    }

    return await this.scheduleRepository.find({
      where: { group: groupId },
      relations: ['group'],
    });
  }

  async getMembers(groupId: number): Promise<Member[]> {
    const group = await this.groupRepository.findOne(groupId);
    if (!group) {
      throw new NotFoundException({
        message: `존재하지 않는 그룹입니다.`,
      });
    }

    return await this.memberRepository.find({
      where: { group: groupId },
      relations: ['group'],
    });
  }

  async update(
    id: number,
    groupId: number,
    updateGroupDto: UpdateGroupDto,
  ): Promise<Group> {
    const group = await this.groupRepository.findOne({ id: groupId });
    if (!group) {
      throw new NotFoundException({
        message: `존재하지 않는 그룹입니다.`,
      });
    }

    const member = await this.memberRepository.findOne({
      group: groupId,
      user: id,
    });
    if (!member || member.grade === MEMBER_GRADE.NORMAL) {
      throw new BadRequestException({
        message: `그룹 정보를 수정할 수 없습니다.`,
      });
    }

    group.color = updateGroupDto.color;
    group.name = updateGroupDto.name;

    await this.groupRepository.save(group);
    return group;
  }

  async remove(id: number, groupId: number): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const member = await this.memberRepository.findOne({
        user: id,
        group: groupId,
      });
      if (!member || member.grade !== MEMBER_GRADE.MASTER) {
        throw new Error(`그룹 삭제를 할 수 없습니다.`);
      }

      const group = await this.groupRepository.findOne({ id: groupId });
      if (!group) {
        throw new Error(`존재하지 않는 그룹입니다.`);
      }

      await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(Schedule)
        .where('groupId = :groupId', { groupId })
        .execute();

      await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(Member)
        .where('groupId = :groupId', { groupId })
        .execute();

      await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(Group)
        .where('id = :groupId', { groupId })
        .execute();

      await queryRunner.commitTransaction();
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
