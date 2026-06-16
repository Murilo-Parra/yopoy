export class FiscalProductionFinalStateDisclosureNoPersistencePlan {
  public static getPlan() {
    return {
      disclosureNoPersistencePlanGenerated: true,
      realDisclosureRecordPersisted: false,
      realHandoffRecordPersisted: false,
      realFilesystemWritten: false,
      realStorageUploaded: false,
      realDatabaseWritten: false,
      description: 'Impedir persistência real de disclosure e handoff.'
    };
  }
}
