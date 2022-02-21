import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Member} from "../../member/entities/member.entity";

@Entity()
export class Schedule {
    @PrimaryGeneratedColumn({ comment: '일정 아이디' })
    id: number;

    @Column({ type: 'varchar', length: 45, comment: '일정명' })
    title: string;

    @Column({ comment: '일정 시작 날짜' })
    startAt: Date;

    @Column({ comment: '일정 끝 날짜' })
    endAt: Date;

    @CreateDateColumn({ comment: '생성 날짜' })
    createdAt: Date;

    @UpdateDateColumn({ comment: '갱신 날짜' })
    updatedAt: Date;

    @DeleteDateColumn({ comment: '삭제 날짜' })
    deletedAt: Date;

    @ManyToOne(() => Member, member => member.schedules)
    members: Member;
}
