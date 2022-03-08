import { Controller, Get, Post, Body, Param, Delete, Res, HttpStatus, Put } from "@nestjs/common";
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  async create(@Body() createGroupDto: CreateGroupDto, @Res() res) {
    const result = await this.groupService.create(createGroupDto);
    return res.status(HttpStatus.OK).send({
      result: true,
      timestamp: new Date().toISOString(),
      group: result.group,
      member: result.member,
    });
  }

  @Get()
  findAll(@Res() res) {
    return res.status(HttpStatus.OK).send({
      result: true,
      timestamp: new Date().toISOString(),
      groups: this.groupService.findAllMyGroup(),
    });
  }

  @Get(':id')
  getSchedules(@Param('id') id: string, @Res() res) {
    return res.status(HttpStatus.OK).send({
      result: true,
      timestamp: new Date().toISOString(),
      schedules: this.groupService.getSchedules(+id)
    });
  }

  @Get('members/:id')
  getMembers(@Param('id') id: string, @Res() res) {
    return res.status(HttpStatus.OK).send({
      result: true,
      timestamp: new Date().toISOString(),
      members: this.groupService.getMembers(+id)
    });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto, @Res() res) {
    return res.status(HttpStatus.OK).send({
      result: true,
      timestamp: new Date().toISOString(),
      user: await this.groupService.update(+id, updateGroupDto),
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res) {
    await this.groupService.remove(+id);
    return res.status(HttpStatus.OK).send({
      result: true,
      timestamp: new Date().toISOString(),
    });
  }
}
