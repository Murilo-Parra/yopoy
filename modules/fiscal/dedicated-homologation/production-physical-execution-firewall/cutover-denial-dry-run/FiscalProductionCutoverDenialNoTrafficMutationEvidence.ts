export class FiscalProductionCutoverDenialNoTrafficMutationEvidence {
  public static getEvidence() {
    return {
      noTrafficMutationEvidenceGenerated: true,
      trafficChanged: false,
      realTrafficPromoted: false,
      realRequestDuplicated: false,
      description: 'Evidenciar ausência de mutação de tráfego.'
    };
  }
}
