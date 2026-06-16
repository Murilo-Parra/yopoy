export class FiscalProductionGoLiveCutoverEvidencePackageService {
  public static getEvidencePackage() {
    return {
      evidencePackageGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Gerar pacote final apenas com metadados administrativos. Não incluir payload real. Não persistir arquivo.'
    };
  }
}
