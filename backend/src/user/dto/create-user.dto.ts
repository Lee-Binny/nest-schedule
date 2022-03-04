import {IsNotEmpty, IsString} from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly userId: string;

    @IsString()
    @IsNotEmpty()
    readonly nickname: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
