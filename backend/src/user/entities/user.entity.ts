import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Member} from "../../member/entities/member.entity";
import * as bcrypt from "bcrypt";
import {HttpException, HttpStatus} from "@nestjs/common";
import { Schedule } from "../../schedule/entities/schedule.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn({ comment: '유저 아이디' })
    id: number;

    @Column({ type: 'varchar', length: 15, comment: '유저 아이디' })
    userId: string;

    @Column({ type: 'varchar', length: 100, comment: '유저 비밀번호' })
    password: string;

    @Column({ type: 'varchar', length: 15, comment: '유저 별명' })
    nickname: string;

    @CreateDateColumn({ comment: '생성 날짜' })
    createdAt: Date;

    @UpdateDateColumn({ comment: '갱신 날짜' })
    updatedAt: Date;

    @DeleteDateColumn({ comment: '삭제 날짜' })
    deletedAt: Date | null;

    @OneToMany(() => Member, member => member.user)
    members: Member[];

    @OneToMany(() => Schedule, schedule => schedule.user)
    schedules: Schedule[];

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        try {
            this.password = await bcrypt.hash(this.password, 10);
        } catch (e) {
            console.log(e);
            throw new HttpException({
                result: false,
                message: 'failed to hash password'
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}