export class FiscalProductionRuntimeExecutionEvidencePackageService {
  public static generatePackage() {
    return {
      evidencePackageGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      xmlIncluded: false,
      pdfIncluded: false,
      secretsIncluded: false,
      description: 'Gera pacote final de evidências. Não inclui payload bruto, XML bruto, PDF/base64 ou segredo.'
    };
  }
}
