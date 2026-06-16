export class FiscalProductionComplianceNoRealRollbackEvidence {
  public static getEvidence() {
    return {
      noRealRollbackEvidenceGenerated: true,
      realRollbackExecuted: false,
      productionComplianceRollbackNoOpOnly: true,
      description: 'Emitir evidência de ausência de rollback real. Declarar que o teste roda em compliance-rollback-no-op-only.'
    };
  }
}
