export class FiscalProductionActivationVoteSimulation {
  public static simulate() {
    return {
      voteSimulationGenerated: true,
      realAuthorizationTokenIssued: false,
      realExecutionGateUnlocked: false,
      description: 'Simular voto administrativo. Não emitir token real. Não destravar gate.'
    };
  }
}
