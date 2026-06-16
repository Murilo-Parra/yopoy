export class FiscalProductionEvidenceVaultEvidencePackageService {
  public static getPackage() {
    return {
      evidencePackageGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      realAuditPackageCreated: false,
      description: 'Gerar pacote final de evidências apenas como metadados. Não incluir payload, XML, PDF, PFX, certificado, segredo, token ou chave privada. Não criar pacote real de auditoria.'
    };
  }
}
