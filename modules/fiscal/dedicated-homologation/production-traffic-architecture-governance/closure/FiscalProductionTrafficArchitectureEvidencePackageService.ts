export class FiscalProductionTrafficArchitectureEvidencePackageService {
  public static getPackage() {
    return {
      evidencePackageGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Gerar pacote administrativo de evidências sem payload. Não incluir XML, PDF, base64, PFX, certificado, segredo, token ou dados sensíveis.'
    };
  }
}
