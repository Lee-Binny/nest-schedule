import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from "./entities/group.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Member } from "../member/entities/member.entity";
import { MEMBER_GRADE } from "../common/constants";
import { Schedule } from "../schedule/entities/schedule.entity";

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
    private scheduleRepository: Repository<Schedule>
  ) {}

  async create(id: number, createGroupDto: CreateGroupDto): Promise<ResCreateGroup> {
    const isExisted = this.groupRepository.findOne({ name: createGroupDto.name});
    if (isExisted) {
      throw new BadRequestException({
        message: `이미 존재하는 이름입니다.`
      });
    }

    const group = await this.groupRepository.create(createGroupDto);
    await this.groupRepository.save(group);

    const member = await this.memberRepository.create({
      group: group.id,
      user: id,
      grade: MEMBER_GRADE.MASTER,
      color: createGroupDto.myColor
    });
    await this.memberRepository.save(member);

    return { group, member };
  }

  getMyGroups(id: number): Promise<Group[]> {
    return this.groupRepository.createQueryBuilder('group')
      .innerJoinAndMapOne('group.id', Member, 'member', 'group.id = member.groupId')
      .where('member.userId = :userId', { userId: id })
      .getMany();
  }

  async getSchedules(groupId: number): Promise<Schedule[]> {
    const group = await this.groupRepository.findOne(groupId);
    if (!group) {
      throw new NotFoundException({
        message: `존재하지 않는 그룹입니다.`
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
        message: `존재하지 않는 그룹입니다.`
      });
    }

    return await this.memberRepository.find({
      where: { group: groupId },
      relations: ['group'],
    });
  }

  async update(groupId: number, updateGroupDto: UpdateGroupDto): Promise<Group> {
    const group = await this.groupRepository.findOne({ id: groupId });
    if (!group) {
      throw new NotFoundException({
        message: `존재하지 않는 그룹입니다.`
      });
    }

    group.color = updateGroupDto.color;
    group.name = updateGroupDto.name;
    return await this.groupRepository.save(group);
  }

  async remove(id: number, groupId: number): Promise<void> {
    const member = await this.memberRepository.findOne({
      user: id,
      group: groupId
    });
    if (!member || member.grade !== MEMBER_GRADE.MASTER) {
      throw new BadRequestException({
        message: `그룹 삭제가 실패하였습니다.`
      });
    }

    const group = await this.groupRepository.findOne({ id: groupId});
    if (!group) {
      throw new NotFoundException({
        message: `존재하지 않는 그룹입니다.`
      });
    }

    await this.groupRepository.delete({ id: groupId });
  }
}
