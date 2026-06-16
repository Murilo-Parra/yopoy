export class FiscalProductionRuntimeCommandDispatchBoundary {
  public static generateBoundary() {
    return {
      commandDispatchBoundaryGenerated: true,
      commandRunnerExecuted: false,
      shellCommandExecuted: false,
      description: 'Modelagem da fronteira de dispatch de comandos. Não executa command runner nem shell real.'
    };
  }
}
