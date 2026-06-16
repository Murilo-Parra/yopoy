export class FiscalProductionNoRealRollbackEvidence {
  public static getEvidence() {
    return {
      noRealRollbackEvidenceGenerated: true,
      realRollbackExecuted: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Gera evidência de ausência de rollback real. Não inclui payload bruto, XML/PDF/base64 ou segredo.'
    };
  }
}
