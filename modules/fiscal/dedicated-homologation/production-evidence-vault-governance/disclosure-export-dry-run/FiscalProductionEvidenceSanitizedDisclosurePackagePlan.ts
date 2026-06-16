export class FiscalProductionEvidenceSanitizedDisclosurePackagePlan {
  public static getPlan() {
    return {
      sanitizedDisclosurePackagePlanGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      realDisclosureFileGenerated: false,
      description: 'Modelar pacote de disclosure apenas com metadados sanitizados. Não incluir payload, XML, PDF, PFX, certificado, token ou segredo.'
    };
  }
}
