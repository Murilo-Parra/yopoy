export class FiscalProductionLedgerNoRealSignaturePlan {
  public static getPlan() {
    return {
      ledgerNoRealSignaturePlanGenerated: true,
      noRealSignatureOnly: true,
      realSignatureGenerated: false,
      realCryptoUsed: false,
      description: 'Impedir assinatura real.'
    };
  }
}
