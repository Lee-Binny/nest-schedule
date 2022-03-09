import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMemberDto {
  @IsNotEmpty()
  @IsNumber()
  readonly groupId: number;

  @IsNotEmpty()
  @IsString()
  readonly color: string;
}
