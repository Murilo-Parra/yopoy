export class FiscalProductionCustodyChainNoPersistencePlan {
  public static getPlan() {
    return {
      custodyChainNoPersistencePlanGenerated: true,
      realCustodyChainPersisted: false,
      realCustodyRecordPersisted: false,
      realRetentionRecordPersisted: false,
      description: 'Impedir persistência de cadeia de custódia real.'
    };
  }
}
