export class FiscalProductionTwoPersonConsentSimulation {
  public static getSimulation() {
    return {
      twoPersonConsentSimulationGenerated: true,
      realTwoPersonApprovalCompleted: false,
      realExecutionGateUnlocked: false,
      description: 'Modelagem de simulação de aprovação por duas pessoas. Não conclui aprovação real nem destrava gate.'
    };
  }
}
