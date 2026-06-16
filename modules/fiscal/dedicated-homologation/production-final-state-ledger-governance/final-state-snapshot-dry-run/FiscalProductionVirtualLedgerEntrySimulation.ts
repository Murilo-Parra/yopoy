export class FiscalProductionVirtualLedgerEntrySimulation {
  public static getSimulation() {
    return {
      virtualLedgerEntrySimulationGenerated: true,
      realLedgerEntryCreated: false,
      realLedgerRecordPersisted: false,
      description: 'Simular entrada virtual de ledger. Não criar ledger entry real. Não persistir ledger record.'
    };
  }
}
