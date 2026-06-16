export class FiscalProductionFinalStateLedgerGovernanceBlueprint {
  public static getBlueprint() {
    return {
      finalStateLedgerGovernanceBlueprintGenerated: true,
      realLedgerCreated: false,
      realLedgerRecordPersisted: false,
      description: 'Modelar blueprint de ledger final virtual. Não criar ledger real. Não persistir registro real.'
    };
  }
}
