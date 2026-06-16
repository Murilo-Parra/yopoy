export class FiscalProductionRuntimeNoExecutionHandoffService {
  public static generateHandoff() {
    return {
      noExecutionHandoffGenerated: true,
      runtimeClosureHandoffOnly: true,
      runtimeExecutionStarted: false,
      realAuthorizationGranted: false,
      realExecutionGateUnlocked: false,
      productionV2Activated: false,
      description: 'Gera handoff final de não execução runtime. Não autoriza o próximo domínio a executar produção real.'
    };
  }
}
