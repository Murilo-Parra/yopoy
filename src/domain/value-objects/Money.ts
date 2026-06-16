export class Money {
  constructor(public readonly amount: number) {
    if (amount < 0) throw new Error('Money amount cannot be negative');
  }
}
