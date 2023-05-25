export class WithdrawOrderEvent {
    constructor(
        public readonly userId: string,
        public readonly amount: string,
        public readonly transaction_type: string,
    ) { }
}