export class FiscalProductionNoRealExecutionEvidence {
  public static getEvidence() {
    return {
      noRealExecutionEvidenceGenerated: true,
      realGoLiveExecuted: false,
      realRuntimeStarted: false,
      realShellCommandExecuted: false,
      description: 'Evidenciar que nenhuma execução real ocorreu.'
    };
  }
}
