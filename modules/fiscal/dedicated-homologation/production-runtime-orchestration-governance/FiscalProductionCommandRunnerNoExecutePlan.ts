export class FiscalProductionCommandRunnerNoExecutePlan {
  public static getPlan() {
    return {
      commandRunnerNoExecutePlanGenerated: true,
      realShellCommandExecuted: false,
      realCommandRunnerExecuted: false,
      description: 'Modelar command runner e shell sem execução real.'
    };
  }
}
