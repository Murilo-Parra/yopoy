export class FiscalProductionNoRealTrafficReversionEvidence {
  public static getEvidence() {
    return {
      noRealTrafficReversionEvidenceGenerated: true,
      realTrafficReverted: false,
      realTrafficChanged: false,
      description: 'Evidenciar que nenhum tráfego real foi revertido.'
    };
  }
}
