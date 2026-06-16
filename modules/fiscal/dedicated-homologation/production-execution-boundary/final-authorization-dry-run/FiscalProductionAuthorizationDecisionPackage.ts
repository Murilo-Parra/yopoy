export class FiscalProductionAuthorizationDecisionPackage {
  public static generatePackage() {
    return {
      authorizationDecisionPackageGenerated: true,
      go: false,
      noGo: true,
      approvedForRealAuthorization: false,
      approvedForProductionV2: false,
      description: 'Final authorization decision package modeling. Returns noGo: true for real production execution.'
    };
  }
}
