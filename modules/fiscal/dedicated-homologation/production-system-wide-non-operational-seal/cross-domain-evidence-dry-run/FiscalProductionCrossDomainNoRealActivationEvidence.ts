export class FiscalProductionCrossDomainNoRealActivationEvidence {
  public static getEvidence() {
    return {
      crossDomainNoRealActivationEvidenceGenerated: true,
      realGoLiveApproved: false,
      realGoLiveExecuted: false,
      realCutoverExecuted: false,
      productionV2Activated: false,
      description: 'Evidenciar ausência de go-live, cutover e Produção V2.'
    };
  }
}
