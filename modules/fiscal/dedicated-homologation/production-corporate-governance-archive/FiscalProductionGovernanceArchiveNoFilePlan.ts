export class FiscalProductionGovernanceArchiveNoFilePlan {
  public static getPlan() {
    return {
      archiveNoFilePlanGenerated: true,
      realArchiveFileGenerated: false,
      realPdfGenerated: false,
      realZipGenerated: false,
      realJsonGenerated: false,
      realCsvGenerated: false,
      description: 'Impedir geração de arquivo real.'
    };
  }
}
