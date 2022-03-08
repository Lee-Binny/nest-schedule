import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException, HttpStatus,
} from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    res.status(HttpStatus.OK).json({
      result: false,
      timestamp: new Date().toISOString(),
      message: exception.message,
    });
  }
}