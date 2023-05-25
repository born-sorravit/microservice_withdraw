import { Injectable } from '@nestjs/common';
import { WithdrawOrderEvent } from './withdraw-order.event';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  // handleWithdrawOrder(withdrawOrderEvent: WithdrawOrderEvent) {
  //   console.log(withdrawOrderEvent);
  //   let balance: number = 500;
  //   let newBalance: number = balance - Number(withdrawOrderEvent.amount);
  //   if (newBalance >= 0) {
  //     // return this.accountClient.send('update_balance', { userId: withdrawOrderEvent.userId, balance: newBalance }).subscribe(() => {
  //     //   `UserId : ${withdrawOrderEvent.userId} => Withdraw success
  //     //    Your balance is ${newBalance}`
  //     // })
  //     console.log(`UserId : ${withdrawOrderEvent.userId} => Withdraw success | Your balance is ${newBalance}`);
  //   } else {
  //     console.log('Withdraw failed => Your balance is not enough');
  //   }
  // }
}
