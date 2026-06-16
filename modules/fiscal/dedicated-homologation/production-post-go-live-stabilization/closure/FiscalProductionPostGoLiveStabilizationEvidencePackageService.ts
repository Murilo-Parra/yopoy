export class FiscalProductionPostGoLiveStabilizationEvidencePackageService {
  public static getPackage() {
    return {
      evidencePackageGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      fileSystemWritten: false,
      description: 'Gerar pacote de evidência administrativa sem payload real. Não persistir arquivo. Não exportar ZIP/PDF/JSON real. Não gravar banco.'
    };
  }
}
