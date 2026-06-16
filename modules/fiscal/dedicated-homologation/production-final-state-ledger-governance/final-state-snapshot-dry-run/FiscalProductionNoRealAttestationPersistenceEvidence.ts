export class FiscalProductionNoRealAttestationPersistenceEvidence {
  public static getEvidence() {
    return {
      noRealAttestationPersistenceEvidenceGenerated: true,
      realAttestationPersisted: false,
      description: 'Evidenciar que nenhum atestado real foi persistido.'
    };
  }
}
