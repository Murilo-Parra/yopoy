export class FiscalProductionLedgerNoRealHashPlan {
  public static getPlan() {
    return {
      ledgerNoRealHashPlanGenerated: true,
      noRealHashOnly: true,
      realHashGenerated: false,
      description: 'Impedir hash real.'
    };
  }
}
