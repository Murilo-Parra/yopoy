export class FiscalRealNetworkBlueprint {
  public static getBlueprint() {
    return {
      plannedSegmentation: 'Private Subnet para Serviços Fiscais',
      futureEgressAllowlist: ['Autorizadores SEFAZ', 'Storage de PDF', 'KMS AWS/GCP'],
      plannedHostnames: ['api-fiscal-homolog.interno.net'],
      networkApplied: false,
      productionTrafficAttached: false
    };
  }
}
