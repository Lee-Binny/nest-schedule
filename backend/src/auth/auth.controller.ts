import { Controller, Get, HttpStatus, Post, Req, Res, UseFilters, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post()
  @UseGuards(AuthGuard('local'))
  async signIn(@Req() req, @Res() res) {
    return res.status(HttpStatus.OK).send({
      result: true,
      timestamp: new Date().toISOString(),
      auth: req.user,
    });
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Req() req, @Res() res) {
    return res.status(HttpStatus.OK).send({
      result: true,
      user: req.user,
    })
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async logout(@Req() req, @Res() res) {
    // TODO 로그아웃 기능 구현
  }
}
