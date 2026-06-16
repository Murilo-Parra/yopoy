export class FiscalProductionRuntimeTransactionBoundaryPlan {
  public static generatePlan() {
    return {
      transactionBoundaryPlanGenerated: true,
      realTransactionOpened: false,
      realTransactionCommitted: false,
      realTransactionRolledBack: false,
      description: 'Modelagem da fronteira transacional em modo documental. Não abre transação real. Não executa commit ou rollback real.'
    };
  }
}
