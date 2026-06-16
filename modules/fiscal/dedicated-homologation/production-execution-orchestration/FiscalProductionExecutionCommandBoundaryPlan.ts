export class FiscalProductionExecutionCommandBoundaryPlan {
  public static generatePlan() {
    return {
      commandBoundaryPlanGenerated: true,
      commandBoundaryPlanOnly: true,
      executableArtifactGenerated: false,
      description: 'Modelagem da fronteira de comandos proibidos. Não gera shell command nem artefato executável.'
    };
  }
}
