export class FiscalProductionRuntimeNoOpSafetyContract {
  public static generateContract() {
    return {
      runtimeNoOpSafetyContractGenerated: true,
      runtimeNoOpSafetyContractOnly: true,
      activationBlocked: true,
      description: 'Modelagem de contrato runtime no-op. Impede qualquer execução ativa.'
    };
  }
}
