import { Controller, HttpStatus, Post, Req, Res, UseFilters, UseGuards } from "@nestjs/common";
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
}
