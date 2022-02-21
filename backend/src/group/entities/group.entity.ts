import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Member} from "../../member/entities/member.entity";

@Entity()
export class Group {
    @PrimaryGeneratedColumn({ comment: '그룹 아이디' })
    id: number;

    @Column({ type: 'varchar', length: 45, comment: '그룹명' })
    name: string;

    @Column({ type: 'varchar', length: 7, comment: '그룹 색깔' })
    color: string;

    @CreateDateColumn({ comment: '생성 날짜' })
    createdAt: Date;

    @UpdateDateColumn({ comment: '갱신 날짜' })
    updatedAt: Date;

    @DeleteDateColumn({ comment: '삭제 날짜' })
    deletedAt: Date;

    @OneToMany(() => Member, member => member.userId)
    members: Member[];
}
