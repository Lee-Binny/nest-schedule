import { IsNotEmpty, IsString } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';
import { CreateMemberDto } from './create-member.dto';

export class UpdateGradeDto extends OmitType(CreateMemberDto, ['color' as const]){
  @IsNotEmpty()
  @IsString()
  readonly grade: string;
}
