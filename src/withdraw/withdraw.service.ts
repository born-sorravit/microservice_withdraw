import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { WithdrawRequest } from 'src/withdraw-request.dto';
import { WithdrawOrderEvent } from 'src/withdraw-order.event';
import { Repository } from 'typeorm';
import { Withdraw } from './entites/withdraw.entity';

@Injectable()
export class WithdrawService {
    constructor(
        @InjectRepository(Withdraw) private repo: Repository<Withdraw>,
        @Inject("ACCOUNT_SERVICE") private readonly accountClient: ClientKafka

    ) { }

    async handleWithdrawOrder(withdrawOrderEvent: WithdrawOrderEvent) {
        let balance: number;
        let newBalance: number;
        let withdrawStatus = false
        this.accountClient.send('get_user_balance', new WithdrawRequest(withdrawOrderEvent.userId)).subscribe((user) => {
            balance = Number(user.balance)
            newBalance = balance - Number(withdrawOrderEvent.amount);
        })
        if (newBalance >= 0) {
            withdrawStatus = true;
            this.accountClient.send('update_balance', { userId: withdrawOrderEvent.userId, balance: newBalance, status: withdrawStatus }).subscribe(() => {
                console.log(`UserId : ${withdrawOrderEvent.userId} => Withdraw success | Your balance is ${newBalance}`);
            })
            try {
                const withdrawOrder = await this.repo.create({
                    userId: withdrawOrderEvent.userId,
                    oldBalance: balance.toString(),
                    withdrawAmount: withdrawOrderEvent.amount,
                    newBalance: newBalance.toString()
                })
                await this.repo.save(withdrawOrder)
            } catch (error) {
                console.log(error);
            }
        } else {
            this.accountClient.send('update_balance', { userId: withdrawOrderEvent.userId, balance: balance, status: withdrawStatus }).subscribe(() => {
                console.log('Withdraw failed => Your balance is not enough');
            })
        }
    }
}
