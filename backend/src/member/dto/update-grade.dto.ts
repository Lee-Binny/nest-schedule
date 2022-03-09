import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateGradeDto {
  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly groupId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly grade: number;
}
