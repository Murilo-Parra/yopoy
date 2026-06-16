export class FiscalProductionShellCommandNoExecutePlan {
  public static getPlan() {
    return {
      shellCommandNoExecutePlanGenerated: true,
      realShellCommandExecuted: false,
      description: 'Bloquear qualquer shell command real. Não retornar stdout/stderr real.'
    };
  }
}
