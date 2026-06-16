export class FiscalProductionRollbackAbortCriteria {
  public static getCriteria() {
    return {
      rollbackAbortCriteriaGenerated: true,
      approvedForRealRollback: false,
      approvedForRealAbort: false,
      description: 'Consolidar critérios de abort/rollback. Não aprovar execução real.'
    };
  }
}
