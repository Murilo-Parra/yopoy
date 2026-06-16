export class FiscalProductionEvidenceNoExternalExportEvidence {
  public static getEvidence() {
    return {
      noExternalExportEvidenceGenerated: true,
      realEvidenceExported: false,
      externalStorageUploaded: false,
      webhookSent: false,
      emailSent: false,
      description: 'Evidenciar ausência de exportação externa.'
    };
  }
}
