export class FiscalProductionOperationsReadinessNoActivationHandoffService {
  public static simulateHandoff() {
    return {
      noActivationHandoffGenerated: true,
      realOperationsHandoffCompleted: false,
      realOperationsActivated: false,
      productionV2Activated: false,
      description: 'Modelar handoff final sem ativação. Não concluir handoff operacional real. Não conceder acesso real. Não ativar operação V2.'
    };
  }
}
