// Empty file just to declare the UnitOfWork types
export interface TransactionContext {
  // Envelopa DB Client cru ou Transaction client base.
  executor: any;
}

export interface UnitOfWork {
  transaction<T>(companyId: string, fn: (tx: TransactionContext) => Promise<T>): Promise<T>;
}
