import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Withdraw {
    @PrimaryGeneratedColumn({
        name: 'withdraw_id',
    })
    withdrawId: string;

    @Column({ type: 'uuid', unique: true })
    @Generated('uuid')
    uuid: string;

    @Column({ name: 'user_id', nullable: false, default: '' })
    userId: string;

    @Column({ name: 'old_balance', nullable: false, default: 0 })
    oldBalance: string;

    @Column({ name: 'withdraw_amount', nullable: false, default: 0 })
    withdrawAmount: string;

    @Column({ name: 'new_balance', nullable: false, default: 0 })
    newBalance: string;
}