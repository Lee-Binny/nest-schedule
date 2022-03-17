import { IsNotEmpty, IsString } from "class-validator";

export class CreateMemberDto {
  @IsNotEmpty()
  @IsString()
  readonly userId: string;

  @IsNotEmpty()
  @IsString()
  readonly groupId: string;

  @IsNotEmpty()
  @IsString()
  readonly color: string;
}
