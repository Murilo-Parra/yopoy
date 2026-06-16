export class FiscalProductionActivationEvidencePackageService {
  public static getPackage() {
    return {
      evidencePackageGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Gerar pacote final de evidências sem payload bruto. Não incluir XML, PDF/base64, PFX, certificado, token, segredo ou chave privada.'
    };
  }
}
