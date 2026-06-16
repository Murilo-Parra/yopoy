export class FiscalProductionArchiveNoHashNoSignaturePlan {
  public static getPlan() {
    return {
      archiveNoHashNoSignaturePlanGenerated: true,
      realHashGenerated: false,
      realSignatureGenerated: false,
      realProofCreated: false,
      realCryptographicProofCreated: false,
      description: 'Impedir hash, assinatura e proof real.'
    };
  }
}
