export class FiscalProductionOperationsNonExecutableActivationConsentContract {
  public static getContract() {
    return {
      nonExecutableActivationConsentContractGenerated: true,
      realConsentPersisted: false,
      realExecutionGateUnlocked: false,
      description: 'Modelar contrato de consentimento de ativação como não executável. Não persistir consentimento real. Não destravar gate.'
    };
  }
}
