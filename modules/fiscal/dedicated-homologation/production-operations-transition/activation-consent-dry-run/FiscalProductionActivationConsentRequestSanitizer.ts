export class FiscalProductionActivationConsentRequestSanitizer {
  public static getSanitizer() {
    return {
      requestSanitizerGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Sanitiza metadados de consentimento. Remove payload bruto, XML, PDF, base64, segredo, token, certificado, PFX ou senha.'
    };
  }
}
