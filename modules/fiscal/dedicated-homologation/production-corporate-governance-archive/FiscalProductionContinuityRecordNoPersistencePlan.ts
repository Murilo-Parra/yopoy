export class FiscalProductionContinuityRecordNoPersistencePlan {
  public static getPlan() {
    return {
      continuityRecordNoPersistencePlanGenerated: true,
      realArchiveRecordPersisted: false,
      realContinuityRecordPersisted: false,
      description: 'Impedir persistência de registros reais de continuidade.'
    };
  }
}
