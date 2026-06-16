export class FiscalProductionOperationsMockAttestationReviewMatrix {
  public static getMatrix() {
    return {
      mockAttestationReviewMatrixGenerated: true,
      realAttestationPersisted: false,
      realSignatureCollected: false,
      description: 'Revisar atestados mockados. Não persistir atestado real. Não coletar assinatura real.'
    };
  }
}
