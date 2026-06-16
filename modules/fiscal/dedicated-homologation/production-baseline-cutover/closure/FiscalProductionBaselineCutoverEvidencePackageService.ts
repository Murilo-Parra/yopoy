export class FiscalProductionBaselineCutoverEvidencePackageService {
  public static getPackage() {
    return {
      evidencePackageGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Pacote de evidências final gerado. Não persiste evidência real. Sem payload bruto.'
    };
  }
}
