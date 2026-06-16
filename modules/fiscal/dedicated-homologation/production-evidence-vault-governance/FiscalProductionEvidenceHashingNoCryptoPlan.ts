export class FiscalProductionEvidenceHashingNoCryptoPlan {
  public static getPlan() {
    return {
      evidenceHashingNoCryptoPlanGenerated: true,
      realCryptoUsed: false,
      realPayloadHashed: false,
      description: 'Modelar hash documental sem crypto real. Não aplicar hash real em payload produtivo.'
    };
  }
}
