export class FiscalProductionNoTrafficMutationEvidence {
  public static getEvidence() {
    return {
      noTrafficMutationEvidenceGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      trafficChanged: false,
      description: 'Evidencia ausência de mutação de tráfego. Não inclui payload bruto.'
    };
  }
}
