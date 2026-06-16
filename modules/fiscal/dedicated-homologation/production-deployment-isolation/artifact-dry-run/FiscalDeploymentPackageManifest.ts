export class FiscalDeploymentPackageManifest {
  public static generateManifest() {
    return {
      deploymentPackageManifestGenerated: true,
      deploymentPackageDryRunOnly: true,
      realPackagePublished: false,
      realDeployExecuted: false,
      description: 'Documentary deployment package manifest. No real package is published or deployed.'
    };
  }
}
