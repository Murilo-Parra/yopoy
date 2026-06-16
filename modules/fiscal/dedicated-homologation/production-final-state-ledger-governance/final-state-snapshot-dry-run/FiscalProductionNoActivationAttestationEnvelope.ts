export class FiscalProductionNoActivationAttestationEnvelope {
  public static getEnvelope() {
    return {
      noActivationAttestationEnvelopeGenerated: true,
      realAttestationPersisted: false,
      realLegalProofCreated: false,
      description: 'Modelar envelope de atestado administrativo sem ativação. Não persistir atestado. Não gerar prova legal.'
    };
  }
}
