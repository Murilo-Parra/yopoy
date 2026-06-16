export class FiscalProductionCustodyStateNoPersistencePlan {
  public static getPlan() {
    return {
      custodyStateNoPersistencePlanGenerated: true,
      realCustodyRecordPersisted: false,
      realRetentionRecordPersisted: false,
      description: 'Impedir persistência de custódia real.'
    };
  }
}
