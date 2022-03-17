import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { JwtAuthGuard } from '../../dist/auth/jwt-auth.guard';
import { JoinGroupDto } from './dto/join-group.dto';

@UseGuards(JwtAuthGuard)
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  async create(@Req() req, @Body() createGroupDto: CreateGroupDto, @Res() res) {
    const result = await this.groupService.create(req.user.id, createGroupDto);
    return res.status(HttpStatus.OK).send({
      result: true,
      timestamp: new Date().toISOString(),
      group: result.group,
      member: result.member,
    });
  }

  @Get()
  async getMyGroups(@Req() req, @Res() res) {
    return res.status(HttpStatus.OK).send({
      result: true,
      timestamp: new Date().toISOString(),
      groups: await this.groupService.getMyGroups(req.user.id),
    });
  }

  @Get(':name')
  async searchGroup(@Param('name') name: string, @Res() res) {
    return res.status(HttpStatus.OK).send({
      result: true,
      timestamp: new Date().toISOString(),
      groups: await this.groupService.searchByName(name),
    });
  }

  @Post('join/:groupId')
  async join(
    @Req() req,
    @Param('groupId') groupId: string,
    @Body() joinGroupDto: JoinGroupDto,
    @Res() res,
  ) {
    return res.status(HttpStatus.OK).send({
      result: true,
      timestamp: new Date().toISOString(),
      member: await this.groupService.join(req.user.id, +groupId, joinGroupDto),
    });
  }

  @Get('schedule/:groupId')
  async getSchedules(@Param('groupId') groupId: string, @Res() res) {
    return res.status(HttpStatus.OK).send({
      result: true,
      timestamp: new Date().toISOString(),
      schedules: await this.groupService.getSchedules(+groupId),
    });
  }

  @Get('members/:groupId')
  async getMembers(@Param('groupId') groupId: string, @Res() res) {
    return res.status(HttpStatus.OK).send({
      result: true,
      timestamp: new Date().toISOString(),
      members: await this.groupService.getMembers(+groupId),
    });
  }

  @Put(':groupId')
  async update(
    @Req() req,
    @Param('groupId') groupId: string,
    @Body() updateGroupDto: UpdateGroupDto,
    @Res() res,
  ) {
    return res.status(HttpStatus.OK).send({
      result: true,
      timestamp: new Date().toISOString(),
      group: await this.groupService.update(req.user.id, +groupId, updateGroupDto),
    });
  }

  @Delete(':groupId')
  async remove(@Req() req, @Param('groupId') groupId: string, @Res() res) {
    await this.groupService.remove(req.user.id, +groupId);
    return res.status(HttpStatus.OK).send({
      result: true,
      timestamp: new Date().toISOString(),
    });
  }
}
