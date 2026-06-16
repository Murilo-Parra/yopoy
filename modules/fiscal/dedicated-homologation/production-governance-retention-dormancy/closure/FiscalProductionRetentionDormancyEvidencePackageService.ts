export class FiscalProductionRetentionDormancyEvidencePackageService {
  public static getPackage() {
    return {
      evidencePackageGenerated: true,
      realExportPackageCreated: false,
      realPdfGenerated: false,
      realZipGenerated: false,
      description: 'Montar pacote documental virtual. Não criar pacote real. Não gerar arquivo real.'
    };
  }
}
