export class FiscalProductionRuntimeTransactionNoOpenPlan {
  public static getPlan() {
    return {
      runtimeTransactionNoOpenPlanGenerated: true,
      realTransactionOpened: false,
      realTransactionCommitted: false,
      realTransactionRolledBack: false,
      description: 'Modelar transações de runtime sem abertura real. Não abrir, commit ou rollback real.'
    };
  }
}
