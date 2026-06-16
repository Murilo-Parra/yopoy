export class FiscalProductionExplicitActivationConsentEnvelope {
  public static getEnvelope() {
    return {
      consentEnvelopeGenerated: true,
      realSignatureCollected: false,
      realConsentPersisted: false,
      description: 'Modelagem de envelope não executável de consentimento explícito. Não coleta assinatura real nem persiste envelope real.'
    };
  }
}
