export class FiscalProductionFinalStateLedgerEvidencePackageService {
  public static getEvidencePackage() {
    return {
      evidencePackageGenerated: true,
      description: 'Gerar pacote administrativo de evidências sem arquivos reais. Não gerar ZIP/PDF/JSON/CSV real. Não persistir nada.'
    };
  }
}
