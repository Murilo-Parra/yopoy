export class FiscalProductionCutoverAbortCriteria {
  public static getCriteria() {
    return {
      abortCriteriaGenerated: true,
      cutoverExecuted: false,
      realRollbackExecuted: false,
      description: 'Modelagem de critérios de abort. Não aciona abort real. Não executa rollback real.'
    };
  }
}
