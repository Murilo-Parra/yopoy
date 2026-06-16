export class FiscalProductionPhysicalExecutionFirewallEvidencePackageService {
  public static getPackage() {
    return {
      evidencePackageGenerated: true,
      realEvidenceRecordPersisted: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Gerar pacote final de evidências sem payload bruto. Não persistir evidence record real.'
    };
  }
}
