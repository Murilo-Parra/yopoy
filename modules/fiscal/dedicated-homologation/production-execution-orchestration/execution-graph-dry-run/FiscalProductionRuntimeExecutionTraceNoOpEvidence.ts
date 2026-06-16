export class FiscalProductionRuntimeExecutionTraceNoOpEvidence {
  public static generateEvidence() {
    return {
      executionTraceNoOpEvidenceGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Gera evidência de ausência de execução operacional. Não inclui payload bruto, XML, PDF/base64 ou segredo.'
    };
  }
}
