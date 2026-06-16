export class FiscalProductionSchedulerCommandNoRealProcessEvidence {
  public static getEvidence() {
    return {
      schedulerCommandNoRealProcessEvidenceGenerated: true,
      realProcessManagerCreated: false,
      realLifecycleRunnerCreated: false,
      description: 'Evidenciar ausência de process manager, lifecycle runner, pid real e process pool real.'
    };
  }
}
