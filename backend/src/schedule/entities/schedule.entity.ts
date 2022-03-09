import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Group } from '../../group/entities/group.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn({ comment: '일정 아이디' })
  id: number;

  @Column({ comment: '그룹 아이디' })
  @ManyToOne(() => Group, group => group.schedules)
  group: number;

  @Column({ comment: '유저 아이디' })
  @ManyToOne(() => User, user => user.schedules)
  user: number;

  @Column({ type: 'varchar', length: 45, comment: '일정명' })
  title: string;

  @Column({ type: 'varchar', length: 7, comment: '일정색깔' })
  color: string;

  @Column({ comment: '일정 시작 날짜' })
  startAt: Date;

  @Column({ comment: '일정 끝 날짜' })
  endAt: Date;

  @CreateDateColumn({ comment: '생성 날짜' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '갱신 날짜' })
  updatedAt: Date;
}
