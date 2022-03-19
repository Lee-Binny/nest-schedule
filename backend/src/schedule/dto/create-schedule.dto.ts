import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateScheduleDto {
  @IsNotEmpty()
  @IsString()
  readonly groupId: string;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly startAt: string;

  @IsNotEmpty()
  @IsString()
  readonly endAt: string;
}
