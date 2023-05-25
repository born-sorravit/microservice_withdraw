import { Controller, Inject } from '@nestjs/common';
import { ClientKafka, EventPattern } from '@nestjs/microservices';
import { WithdrawService } from './withdraw.service';

@Controller('withdraw')
export class WithdrawController {
    constructor(
        private readonly withdrawService: WithdrawService,
        @Inject("ACCOUNT_SERVICE") private readonly accountClient: ClientKafka
    ) { }


    @EventPattern('withdraw_order')
    handleOrderCreate(data: any) {
        return this.withdrawService.handleWithdrawOrder(data);
    }

    onModuleInit() {
        this.accountClient.subscribeToResponseOf('update_balance')
    }
}
