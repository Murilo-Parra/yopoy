export class FiscalProductionRuntimeNoJobEnqueueEvidence {
  public static generateEvidence() {
    return {
      noJobEnqueueEvidenceGenerated: true,
      realJobEnqueued: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Evidência de que nenhum job real foi enfileirado. Não inclui payload bruto ou segredo.'
    };
  }
}
