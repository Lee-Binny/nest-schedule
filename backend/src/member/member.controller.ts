import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Req,
  Put,
  Res,
  HttpStatus, UseGuards,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  async create(
    @Req() req,
    @Body() createMemberDto: CreateMemberDto,
    @Res() res,
  ) {
    return res.status(HttpStatus.OK).send({
      result: true,
      timestamp: new Date().toISOString(),
      member: await this.memberService.create(req.user.id, createMemberDto),
    });
  }

  @Put()
  async update(
    @Req() req,
    @Body() updateMemberDto: UpdateMemberDto,
    @Res() res,
  ) {
    return res.status(HttpStatus.OK).send({
      result: true,
      timestamp: new Date().toISOString(),
      member: await this.memberService.update(req.user.id, updateMemberDto),
    });
  }

  @Put('grade')
  async updateMemberGrade(
    @Req() req,
    @Body() updateGradeDto: UpdateGradeDto,
    @Res() res,
  ) {
    return res.status(HttpStatus.OK).send({
      result: true,
      timestamp: new Date().toISOString(),
      member: await this.memberService.updateGrade(req.user.id, updateGradeDto),
    });
  }

  @Delete(':groupId')
  async remove(@Req() req, @Param('groupId') groupId: string, @Res() res) {
    await this.memberService.remove(req.user.id, +groupId);
    return res.status(HttpStatus.OK).send({
      result: true,
      timestamp: new Date().toISOString(),
    });
  }
}
