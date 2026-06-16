export class FiscalProductionCorporateGovernanceArchiveEvidencePackageService {
  public static getPackage() {
    return {
      evidencePackageGenerated: true,
      description: 'Gerar pacote administrativo de evidências sem arquivo real. Não gerar ZIP/PDF/JSON/CSV real. Não persistir nada. Não exportar nada.'
    };
  }
}
