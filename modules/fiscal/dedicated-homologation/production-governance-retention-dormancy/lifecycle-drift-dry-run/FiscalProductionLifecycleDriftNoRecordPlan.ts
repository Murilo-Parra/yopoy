export class FiscalProductionLifecycleDriftNoRecordPlan {
  public static getPlan() {
    return {
      lifecycleDriftNoRecordPlanGenerated: true,
      realLifecycleRecordPersisted: false,
      realRetentionRecordPersisted: false,
      realDeletionRecordPersisted: false,
      description: 'Impedir gravação de registro real de drift/lifecycle.'
    };
  }
}
