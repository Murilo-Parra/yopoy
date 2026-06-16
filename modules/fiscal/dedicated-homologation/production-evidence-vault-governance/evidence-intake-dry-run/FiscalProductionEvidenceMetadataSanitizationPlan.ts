export class FiscalProductionEvidenceMetadataSanitizationPlan {
  public static getPlan() {
    return {
      metadataSanitizationPlanGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Modelar sanitização de metadados. Remover payload, XML, PDF, PFX, certificado, token e segredo.'
    };
  }
}
