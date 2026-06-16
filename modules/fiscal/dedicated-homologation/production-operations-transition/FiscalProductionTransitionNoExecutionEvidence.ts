export class FiscalProductionTransitionNoExecutionEvidence {
  public static getEvidence() {
    return {
      noExecutionEvidenceGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Gera evidência de não execução. Não inclui payload bruto ou dado sensível.'
    };
  }
}
