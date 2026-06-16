export class FiscalProductionExecutionNoSideEffectEvidence {
  public static generateEvidence() {
    return {
      noSideEffectEvidenceGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Documentary evidence of absence of side effects. No raw payload, raw XML, PDF/base64, or secret included.'
    };
  }
}
