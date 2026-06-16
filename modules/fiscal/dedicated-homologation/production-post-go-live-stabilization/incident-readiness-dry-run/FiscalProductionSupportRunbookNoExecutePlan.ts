export class FiscalProductionSupportRunbookNoExecutePlan {
  public static getPlan() {
    return {
      supportRunbookNoExecutePlanGenerated: true,
      realRunbookExecuted: false,
      realShellCommandExecuted: false,
      description: 'Modelar runbook de suporte sem execução. Não executar runbook real. Não executar shell, worker, queue ou job.'
    };
  }
}
