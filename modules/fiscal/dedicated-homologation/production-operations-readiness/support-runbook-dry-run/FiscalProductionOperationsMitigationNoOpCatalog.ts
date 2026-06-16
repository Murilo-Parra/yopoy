export class FiscalProductionOperationsMitigationNoOpCatalog {
  public static getCatalog() {
    return {
      mitigationNoOpCatalogGenerated: true,
      realRollbackExecuted: false,
      commandRunnerExecuted: false,
      runtimeExecutionStarted: false,
      description: 'Catalogar ações de mitigação simuladas. Não executar rollback, comandos ou runtime real.'
    };
  }
}
