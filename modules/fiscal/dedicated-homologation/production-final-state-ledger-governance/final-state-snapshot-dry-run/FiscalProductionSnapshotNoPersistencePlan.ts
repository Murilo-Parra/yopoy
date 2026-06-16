export class FiscalProductionSnapshotNoPersistencePlan {
  public static getPlan() {
    return {
      snapshotNoPersistencePlanGenerated: true,
      realSnapshotPersisted: false,
      realFilesystemWritten: false,
      realStorageUploaded: false,
      realDatabaseWritten: false,
      description: 'Bloquear persistência real de snapshot.'
    };
  }
}
