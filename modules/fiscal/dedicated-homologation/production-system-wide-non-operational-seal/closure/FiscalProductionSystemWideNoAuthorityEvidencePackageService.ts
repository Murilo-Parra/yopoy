export class FiscalProductionSystemWideNoAuthorityEvidencePackageService {
  public static generatePackage() {
    return {
      noAuthorityEvidencePackageGenerated: true,
      realAuthorityGranted: false,
      realAuthorityPropagated: false,
      realActivationAuthorityGranted: false,
      description: 'Gerar pacote documental de evidência de ausência de autoridade. Não exportar pacote real.'
    };
  }
}
