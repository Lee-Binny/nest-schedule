import { PickType } from '@nestjs/mapped-types';
import { CreateGroupDto } from './create-group.dto';

export class JoinGroupDto extends PickType(CreateGroupDto, [
  'color',
] as const) {}
