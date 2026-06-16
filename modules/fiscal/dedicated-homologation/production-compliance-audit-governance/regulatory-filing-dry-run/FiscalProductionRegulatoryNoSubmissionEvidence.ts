export class FiscalProductionRegulatoryNoSubmissionEvidence {
  public static getEvidence() {
    return {
      noSubmissionEvidenceGenerated: true,
      realRegulatoryFilingSubmitted: false,
      realSubmissionPayloadSent: false,
      externalStorageUploaded: false,
      description: 'Evidenciar ausência de submissão real.'
    };
  }
}
