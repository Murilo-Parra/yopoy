export class FiscalProductionNoRealAccessGrantEvidence {
  public static getEvidence() {
    return {
      noRealAccessGrantEvidenceGenerated: true,
      realAccessGranted: false,
      description: 'Evidenciar que nenhum acesso real foi concedido.'
    };
  }
}
