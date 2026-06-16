export class FiscalProductionActivationCommandNonExecutableEnvelope {
  public static getEnvelope() {
    return {
      activationCommandNonExecutableEnvelopeGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Encapsular comando de ativação como envelope não executável. Não conter payload real, não conter token real, não conter comando shell real.'
    };
  }
}
