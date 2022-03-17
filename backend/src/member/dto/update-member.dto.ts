import{ CreateMemberDto } from './create-member.dto';
import { OmitType } from '@nestjs/mapped-types';

export class UpdateMemberDto extends OmitType(CreateMemberDto, ['userId'] as const) {}
