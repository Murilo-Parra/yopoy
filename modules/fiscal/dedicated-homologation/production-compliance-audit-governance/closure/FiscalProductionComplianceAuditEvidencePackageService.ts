export class FiscalProductionComplianceAuditEvidencePackageService {
  public static generatePackage() {
    return {
      evidencePackageGenerated: true,
      realAuditDossierCreated: false,
      fileSystemWritten: false,
      description: 'Gerar pacote final de evidência administrativa sem arquivo real. Não criar dossiê real. Não gerar PDF/ZIP/JSON real.'
    };
  }
}
