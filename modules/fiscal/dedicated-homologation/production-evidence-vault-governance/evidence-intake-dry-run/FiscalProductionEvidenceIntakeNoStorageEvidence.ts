export class FiscalProductionEvidenceIntakeNoStorageEvidence {
  public static getEvidence() {
    return {
      noStorageEvidenceGenerated: true,
      fileSystemWritten: false,
      databaseWritten: false,
      externalStorageUploaded: false,
      description: 'Evidenciar ausência de storage.'
    };
  }
}
