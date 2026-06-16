export class FiscalProductionMitigationPlaybookNoOpMatrix {
  public static getMatrix() {
    return {
      mitigationPlaybookNoOpMatrixGenerated: true,
      realRunbookExecuted: false,
      realShellCommandExecuted: false,
      description: 'Modelar playbook de mitigação no-op. Não executar runbook real. Não iniciar shell, worker, queue ou job.'
    };
  }
}
