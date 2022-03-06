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

  async create(createGroupDto: CreateGroupDto): Promise<ResCreateGroup> {
    const isExisted = this.groupRepository.findOne({ name: createGroupDto.name});
    if (isExisted) {
      throw new BadRequestException({
        result: false,
        message: `already existed name ${createGroupDto.name}`
      });
    }

    const group = await this.groupRepository.create(createGroupDto);
    await this.groupRepository.save(group);

    // TODO 유저 id 추가
    const member = await this.memberRepository.create({
      group: group.id,
      user: 5,
      grade: MEMBER_GRADE.MASTER,
      color: createGroupDto.myColor
    });
    await this.memberRepository.save(member);

    return { group, member };
  }

  findAllMyGroup(): Promise<Group[]> {
    return this.groupRepository.find()
  }

  async getSchedules(id: number): Promise<Schedule[]> {
    const group = await this.groupRepository.findOne(id);
    if (!group) {
      throw new NotFoundException({
        result: false,
        message: `not found group id ${group.id}`
      });
    }

    return await this.scheduleRepository.find({
      where: {group: id},
      relations: ['group'],
    });
  }

  async getMembers(id: number): Promise<Member[]> {
    const group = await this.groupRepository.findOne(id);
    if (!group) {
      throw new NotFoundException({
        result: false,
        message: `not found group id ${group.id}`
      });
    }

    return await this.memberRepository.find({
      where: {group: id},
      relations: ['group'],
    });
  }

  async update(id: number, updateGroupDto: UpdateGroupDto): Promise<Group> {
    const group = await this.groupRepository.findOne(id);
    if (!group) {
      throw new NotFoundException({
        result: false,
        message: `not found group id ${group.id}`
      });
    }

    group.color = updateGroupDto.color;
    group.name = updateGroupDto.name;
    return await this.groupRepository.save(group);
  }

  async remove(id: number): Promise<void> {
    const group = await this.groupRepository.findOne(id);
    if (!group) {
      throw new NotFoundException({
        result: false,
        message: `not found group id ${group.id}`
      });
    }

    await this.groupRepository.delete(id);
  }
}
