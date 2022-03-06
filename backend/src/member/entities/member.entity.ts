import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, ManyToOne, OneToMany,
    PrimaryGeneratedColumn, Unique,
    UpdateDateColumn
} from "typeorm";
import {User} from "../../user/entities/user.entity";
import {Group} from "../../group/entities/group.entity";
import {Schedule} from "../../schedule/entities/schedule.entity";

@Entity()
@Unique(['group', 'color'])
export class Member {
    @PrimaryGeneratedColumn({ comment: '멤버 아이디' })
    id: number;

    @Column({ comment: '그룹 아이디' })
    @ManyToOne(() => Group, group => group.members)
    group: number;

    @Column({ comment: '유저 아이디' })
    @ManyToOne(() => User, user => user.members)
    user: number;

    @Column({ type: 'tinyint', comment: '멤버 등급' })
    grade: number;

    @Column({ type: 'varchar', length: 7, comment: '그룹 색깔' })
    color: string;

    @CreateDateColumn({ comment: '생성 날짜' })
    createdAt: Date;

    @UpdateDateColumn({ comment: '갱신 날짜' })
    updatedAt: Date;

    @DeleteDateColumn({ comment: '삭제 날짜' })
    deletedAt: Date;
}
