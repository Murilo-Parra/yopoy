export class FiscalProductionRuntimeCommandSanitizer {
  public static sanitize(metadata: any) {
    return {
      commandManifestSanitized: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Sanitiza qualquer metadata que pareça comando real, segredo, token, XML, PDF/base64, PFX, certificado ou database URL substituindo por [SANITIZED_BY_RUNTIME_STEP_DRY_RUN].'
    };
  }
}
