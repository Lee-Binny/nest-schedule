import { IsNotEmpty, IsString } from "class-validator";

export class SignInUserDto {
  @IsNotEmpty()
  @IsString()
  readonly userId: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}