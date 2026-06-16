export class FiscalProductionNoRuntimeExecutionEvidence {
  public static getEvidence() {
    return {
      noRuntimeExecutionEvidenceGenerated: true,
      runtimeExecutionStarted: false,
      commandRunnerExecuted: false,
      shellCommandExecuted: false,
      description: 'Evidencia ausência de runtime real. Não inicia queue, worker, scheduler, cron, shell ou command runner.'
    };
  }
}
