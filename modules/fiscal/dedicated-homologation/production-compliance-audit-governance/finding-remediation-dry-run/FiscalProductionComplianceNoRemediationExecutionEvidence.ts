export class FiscalProductionComplianceNoRemediationExecutionEvidence {
  public static getEvidence() {
    return {
      noRemediationExecutionEvidenceGenerated: true,
      realRemediationExecuted: false,
      fileSystemWritten: false,
      databaseWritten: false,
      description: 'Evidenciar ausência de remediação real executada.'
    };
  }
}
