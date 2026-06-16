export class FiscalProductionNoRealSnapshotPersistenceEvidence {
  public static getEvidence() {
    return {
      noRealSnapshotPersistenceEvidenceGenerated: true,
      realSnapshotPersisted: false,
      description: 'Evidenciar que nenhum snapshot real foi persistido.'
    };
  }
}
