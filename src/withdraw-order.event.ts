export class WithdrawOrderEvent {
    constructor(
        public readonly userId: string,
        public readonly amount: string,
    ) { }
}