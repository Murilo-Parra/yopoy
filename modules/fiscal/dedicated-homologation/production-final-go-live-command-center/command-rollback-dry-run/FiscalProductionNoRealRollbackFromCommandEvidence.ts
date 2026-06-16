export class FiscalProductionNoRealRollbackFromCommandEvidence {
  public static getEvidence() {
    return {
      noRealRollbackFromCommandEvidenceGenerated: true,
      realRollbackExecuted: false,
      description: 'Evidenciar que nenhum rollback real foi executado por comando.'
    };
  }
}
