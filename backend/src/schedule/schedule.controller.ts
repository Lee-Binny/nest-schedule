import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Res, Put, HttpStatus,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  async create(@Req() req, @Body() createScheduleDto: CreateScheduleDto, @Res() res) {
    return res.status(HttpStatus.OK).send({
      result: true,
      timestamp: new Date().toISOString(),
      schedule: await this.scheduleService.create(req.user.id, createScheduleDto)
    });
  }

  @Put(':scheduleId')
  async update(
    @Req() req,
    @Param('scheduleId') scheduleId: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
    @Res() res,
  ) {
    return res.status(HttpStatus.OK).send({
      result: true,
      timestamp: new Date().toISOString(),
      schedule: await this.scheduleService.update(req.user.id, +scheduleId, updateScheduleDto),
    });
  }

  @Delete(':scheduleId')
  async remove(@Req() req, @Param('scheduleId') scheduleId: string, @Res() res) {
    await this.scheduleService.remove(req.user.id, +scheduleId);
    return res.status(HttpStatus.OK).send({
      result: true,
      timestamp: new Date().toISOString(),
    })
  }
}
