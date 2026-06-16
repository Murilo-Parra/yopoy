export class FiscalProductionAuthorizationQuorumSimulation {
  public static getSimulation() {
    return {
      quorumSimulationGenerated: true,
      realApproverNotified: false,
      realDeliberationCompleted: false,
      description: 'Modelagem de quórum de aprovação em simulação. Não notifica aprovador real nem conclui aprovação real.'
    };
  }
}
