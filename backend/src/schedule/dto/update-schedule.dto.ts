import { OmitType } from '@nestjs/mapped-types';
import { CreateScheduleDto } from './create-schedule.dto';

export class UpdateScheduleDto extends OmitType(CreateScheduleDto, ['groupId'] as const) {}
