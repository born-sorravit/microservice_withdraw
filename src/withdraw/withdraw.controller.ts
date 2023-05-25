import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { WithdrawService } from './withdraw.service';

@Controller('withdraw')
export class WithdrawController {
    constructor(private readonly withdrawService: WithdrawService) { }


    @EventPattern('withdraw_order')
    handleOrderCreate(data: any) {
        return this.withdrawService.handleWithdrawOrder(data);
    }

    onModuleInit() {
    }
}
