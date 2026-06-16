export class FiscalProductionOperationsSignatureActivationGateSimulation {
  public static simulate() {
    return {
      signatureActivationGateSimulationGenerated: true,
      realExecutionGateUnlocked: false,
      realAuthorizationGranted: false,
      activationBlocked: true,
      description: 'Modelar o gate simulado de ativação por assinatura. Não destravar gate real. Não conceder autorização real.'
    };
  }
}
