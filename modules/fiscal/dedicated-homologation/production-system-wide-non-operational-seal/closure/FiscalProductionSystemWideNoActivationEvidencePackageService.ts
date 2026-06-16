export class FiscalProductionSystemWideNoActivationEvidencePackageService {
  public static generatePackage() {
    return {
      noActivationEvidencePackageGenerated: true,
      realGoLiveExecuted: false,
      realCutoverExecuted: false,
      productionV2Activated: false,
      description: 'Gerar pacote documental de evidência de ausência de ativação. Não exportar pacote real.'
    };
  }
}
