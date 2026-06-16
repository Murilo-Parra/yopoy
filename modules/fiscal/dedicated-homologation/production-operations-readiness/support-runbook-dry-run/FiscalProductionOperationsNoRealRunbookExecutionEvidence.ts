export class FiscalProductionOperationsNoRealRunbookExecutionEvidence {
  public static getEvidence() {
    return {
      noRealRunbookExecutionEvidenceGenerated: true,
      realRunbookExecuted: false,
      realMitigationExecuted: false,
      shellCommandExecuted: false,
      description: 'Evidenciar ausência de execução real de runbook.'
    };
  }
}
