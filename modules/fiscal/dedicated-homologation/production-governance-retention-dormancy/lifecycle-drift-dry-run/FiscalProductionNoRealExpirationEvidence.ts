export class FiscalProductionNoRealExpirationEvidence {
  public static getEvidence() {
    return {
      noRealExpirationEvidenceGenerated: true,
      realExpirationEvaluated: false,
      description: 'Evidenciar que nenhuma expiração real foi avaliada ou executada.'
    };
  }
}
