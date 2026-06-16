export class FiscalProductionSnapshotNoLegalProofNotice {
  public static getNotice() {
    return {
      snapshotNoLegalProofNoticeGenerated: true,
      realLegalProofCreated: false,
      realCryptographicProofCreated: false,
      description: 'Declarar ausência de efeito legal e ausência de prova criptográfica real.'
    };
  }
}
