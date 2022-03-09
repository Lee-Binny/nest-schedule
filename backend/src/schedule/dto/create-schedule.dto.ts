import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateScheduleDto {
  @IsNotEmpty()
  @IsNumber()
  readonly groupId: number;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsDate()
  readonly startAt: Date;

  @IsNotEmpty()
  @IsDate()
  readonly endAt: Date;
}
