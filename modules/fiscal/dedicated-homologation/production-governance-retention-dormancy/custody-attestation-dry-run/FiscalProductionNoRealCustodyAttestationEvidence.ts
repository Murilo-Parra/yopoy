export class FiscalProductionNoRealCustodyAttestationEvidence {
  public static getEvidence() {
    return {
      noRealCustodyAttestationEvidenceGenerated: true,
      realCustodyAttestationCreated: false,
      realRetentionAttestationCreated: false,
      description: 'Evidenciar que nenhum atestado real foi criado.'
    };
  }
}
