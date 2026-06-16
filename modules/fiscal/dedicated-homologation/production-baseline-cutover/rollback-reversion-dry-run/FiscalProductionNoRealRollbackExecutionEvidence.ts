export class FiscalProductionNoRealRollbackExecutionEvidence {
  public static getEvidence() {
    return {
      noRealRollbackExecutionEvidenceGenerated: true,
      realRollbackExecuted: false,
      runtimeExecutionStarted: false,
      commandRunnerExecuted: false,
      description: 'Evidenciar ausência de rollback real. Não iniciar runtime, queue, worker ou command runner.'
    };
  }
}
