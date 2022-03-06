import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Group } from "./entities/group.entity";
import { Member } from "../member/entities/member.entity";
import { Schedule } from "../schedule/entities/schedule.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Group, Member, Schedule])],
  controllers: [GroupController],
  providers: [GroupService]
})
export class GroupModule {}
