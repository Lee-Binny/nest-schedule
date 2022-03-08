import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { GroupModule } from './group/group.module';
import { MemberModule } from './member/member.module';
import { ScheduleModule } from './schedule/schedule.module';
import {User} from "./user/entities/user.entity";
import {Group} from "./group/entities/group.entity";
import {Member} from "./member/entities/member.entity";
import {Schedule} from "./schedule/entities/schedule.entity";
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from "@nestjs/core";
import { HttpExceptionFilter } from "./common/http-exception.filter";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Group, Member, Schedule],
      synchronize: true,
    }),
    UserModule,
    GroupModule,
    MemberModule,
    ScheduleModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
