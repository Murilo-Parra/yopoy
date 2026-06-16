export class FiscalProductionOperationsTransitionEvidencePackageService {
  public static getPackage() {
    return {
      evidencePackageGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Pacote final de evidências de não ativação gerado sem payload bruto, XML, PDF, base64, token, senha, certificado ou segredo.'
    };
  }
}
