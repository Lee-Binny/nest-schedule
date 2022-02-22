import {IsNotEmpty, IsString} from "class-validator";
import {BeforeInsert} from "typeorm";

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
