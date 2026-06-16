export class FiscalProductionFinalStateNoPersistenceHandoffService {
  public static simulateHandoff() {
    return {
      noPersistenceHandoffGenerated: true,
      realLedgerRecordPersisted: false,
      realSnapshotPersisted: false,
      realAttestationPersisted: false,
      realDisclosureFileExported: false,
      description: 'Simular handoff sem persistência.'
    };
  }
}
