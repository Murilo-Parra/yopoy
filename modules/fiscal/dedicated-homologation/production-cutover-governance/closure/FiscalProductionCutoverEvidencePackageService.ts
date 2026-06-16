export class FiscalProductionCutoverEvidencePackageService {
  public static getEvidencePackage() {
    return {
      evidencePackageGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      realCutoverApproved: false,
      cutoverExecuted: false,
      productionV2Activated: false,
      description: 'Gera pacote final de evidências sem payload bruto. Não inclui XML bruto, PDF/base64, senha, token, privateKey, PFX ou certificado.'
    };
  }
}
