export class FiscalProductionOperationsNoRealAccessGrantEvidence {
  public static getEvidence() {
    return {
      noRealAccessGrantEvidenceGenerated: true,
      realOperationsAccessGranted: false,
      realAssistedSessionOpened: false,
      description: 'Evidenciar ausência de concessão real de acesso. Não abrir sessão assistida real.'
    };
  }
}
