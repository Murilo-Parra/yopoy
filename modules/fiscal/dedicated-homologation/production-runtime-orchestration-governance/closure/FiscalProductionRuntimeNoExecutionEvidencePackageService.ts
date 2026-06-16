export class FiscalProductionRuntimeNoExecutionEvidencePackageService {
  public static getPackage() {
    return {
      evidencePackageGenerated: true,
      realPackagePublished: false,
      executableArtifactGenerated: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Montar pacote administrativo de evidências sem payload. Não publicar pacote.'
    };
  }
}
