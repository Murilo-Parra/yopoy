export class FiscalProductionSnapshotNoRealSignaturePlan {
  public static getPlan() {
    return {
      snapshotNoRealSignaturePlanGenerated: true,
      noRealSignatureOnly: true,
      realSignatureGenerated: false,
      realCryptoUsed: false,
      description: 'Impedir assinatura real.'
    };
  }
}
