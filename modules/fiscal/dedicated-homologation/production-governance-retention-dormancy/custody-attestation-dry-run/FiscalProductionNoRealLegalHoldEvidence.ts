export class FiscalProductionNoRealLegalHoldEvidence {
  public static getEvidence() {
    return {
      noRealLegalHoldEvidenceGenerated: true,
      realLegalHoldApplied: false,
      description: 'Evidenciar que nenhum legal hold real foi aplicado.'
    };
  }
}
