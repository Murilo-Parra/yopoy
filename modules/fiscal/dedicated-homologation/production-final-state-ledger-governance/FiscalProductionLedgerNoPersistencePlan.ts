export class FiscalProductionLedgerNoPersistencePlan {
  public static getPlan() {
    return {
      ledgerNoPersistencePlanGenerated: true,
      noPersistenceOnly: true,
      realLedgerRecordPersisted: false,
      realFilesystemWritten: false,
      realStorageUploaded: false,
      realDatabaseWritten: false,
      description: 'Impedir persistência real de ledger.'
    };
  }
}
