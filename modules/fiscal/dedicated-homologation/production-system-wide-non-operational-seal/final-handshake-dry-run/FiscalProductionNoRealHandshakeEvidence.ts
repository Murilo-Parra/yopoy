export class FiscalProductionNoRealHandshakeEvidence {
  public static getEvidence() {
    return {
      noRealHandshakeEvidenceGenerated: true,
      realHandshakeExecuted: false,
      description: 'Evidenciar ausência de handshake real.'
    };
  }
}
