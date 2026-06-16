export class FiscalProductionOperationsMockAttestationEnvelope {
  public static getEnvelope() {
    return {
      mockAttestationEnvelopeGenerated: true,
      realAttestationPersisted: false,
      realCryptographicSignatureCollected: false,
      description: 'Modelar envelope de atestado mockado. Não persistir atestado real. Não executar assinatura criptográfica real.'
    };
  }
}
