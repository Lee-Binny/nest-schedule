import { Controller, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
export class AuthController {
  constructor() {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async signIn(@Req() req, @Res() res) {
    return res.status(HttpStatus.OK).send({
      result: true,
      auth: req.user,
    });
  }
}
