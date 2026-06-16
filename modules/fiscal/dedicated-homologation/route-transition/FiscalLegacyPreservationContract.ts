export class FiscalLegacyPreservationContract {
  public static generateContract() {
    return {
      legacyPreservationContractGenerated: true,
      routeToLegacy: true,
      routeToV2: false,
      description: 'Mandatory preservation of the legacy system. No legacy route was removed. No legacy response was changed.'
    };
  }
}
