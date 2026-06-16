export class FiscalProductionNoRealRunbookExecutionEvidence {
  public static getEvidence() {
    return {
      noRealRunbookExecutionEvidenceGenerated: true,
      realRunbookExecuted: false,
      realRemediationExecuted: false,
      description: 'Evidenciar ausência de execução real de runbook.'
    };
  }
}
