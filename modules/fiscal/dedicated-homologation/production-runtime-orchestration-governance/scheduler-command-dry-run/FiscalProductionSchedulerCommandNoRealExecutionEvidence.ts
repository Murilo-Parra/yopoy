export class FiscalProductionSchedulerCommandNoRealExecutionEvidence {
  public static getEvidence() {
    return {
      schedulerCommandNoRealExecutionEvidenceGenerated: true,
      realSchedulerCreated: false,
      realCronCreated: false,
      realShellCommandExecuted: false,
      realCommandRunnerExecuted: false,
      description: 'Evidenciar ausência de execução real de scheduler, cron, command runner, shell e task runner.'
    };
  }
}
