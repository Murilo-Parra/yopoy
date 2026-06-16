export class FiscalProductionNoRealRollbackEvidence {
  public static getEvidence() {
    return {
      noRealRollbackEvidenceGenerated: true,
      realRollbackExecuted: false,
      realTrafficReverted: false,
      description: 'Evidenciar ausência de rollback real.'
    };
  }
}
