export class FiscalProductionSensitiveDataCommandDenialPlan {
  public static getPlan() {
    return {
      sensitiveDataCommandDenialPlanGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      realPayloadRead: false,
      description: 'Negar leitura de payload, XML, PDF, tenant data, documento fiscal, token, secret, API key, certificado, PFX, senha e chave privada.'
    };
  }
}
