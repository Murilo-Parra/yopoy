export class FiscalProductionNoRealV2ShutdownEvidence {
  public static getEvidence() {
    return {
      noRealV2ShutdownEvidenceGenerated: true,
      realV2ShutdownExecuted: false,
      productionV2ShutdownNoOpOnly: true,
      description: 'Emitir evidência de ausência de V2 shutdown real. Declarar que o teste roda em v2-shutdown-no-op-only.'
    };
  }
}
