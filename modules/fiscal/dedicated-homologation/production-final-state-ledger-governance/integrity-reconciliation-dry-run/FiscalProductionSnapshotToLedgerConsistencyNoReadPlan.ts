export class FiscalProductionSnapshotToLedgerConsistencyNoReadPlan {
  public static getPlan() {
    return {
      snapshotToLedgerConsistencyNoReadPlanGenerated: true,
      realSnapshotRead: false,
      realLedgerRead: false,
      description: 'Simular comparação snapshot-to-ledger sem leitura real.'
    };
  }
}
