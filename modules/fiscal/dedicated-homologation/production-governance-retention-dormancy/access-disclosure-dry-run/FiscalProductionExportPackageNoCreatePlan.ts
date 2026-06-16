export class FiscalProductionExportPackageNoCreatePlan {
  public static getPlan() {
    return {
      exportPackageNoCreatePlanGenerated: true,
      realExportPackageCreated: false,
      realZipGenerated: false,
      realPdfGenerated: false,
      description: 'Impedir pacote real de exportação/disclosure.'
    };
  }
}
