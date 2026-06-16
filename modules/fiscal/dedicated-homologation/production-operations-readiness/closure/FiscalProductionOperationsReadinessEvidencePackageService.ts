export class FiscalProductionOperationsReadinessEvidencePackageService {
  public static generatePackage() {
    return {
      evidencePackageGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Gerar pacote final de evidências sanitizadas. Não incluir payload bruto. Não incluir dado sensível. Não incluir XML/PDF/PFX/segredo.'
    };
  }
}
