export class FiscalProductionFinalAuthorizationPackage {
  public static generatePackage() {
    return {
      finalAuthorizationPackageGenerated: true,
      realAuthorizationPackagePersisted: false,
      realAuthorizationGranted: false,
      description: 'Administrative consolidation of the simulated final authorization package. Does not grant or persist real authorizations.'
    };
  }
}
