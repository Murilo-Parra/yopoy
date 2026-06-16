export class FiscalProductionNoRealProductionV2Evidence {
  public static getEvidence() {
    return {
      noRealProductionV2EvidenceGenerated: true,
      productionV2Activated: false,
      routeToV2: false,
      routeToLegacy: true,
      description: 'Evidenciar ausência de Produção V2.'
    };
  }
}
