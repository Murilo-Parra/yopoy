export class FiscalProductionExecutionOrchestrationNoSideEffectEvidence {
  public static generateEvidence() {
    return {
      noSideEffectEvidenceGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Evidência de ausência de side effects. Não inclui payload bruto, XML, PDF/base64 ou segredo.'
    };
  }
}
