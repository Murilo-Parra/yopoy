export class FiscalProductionPhysicalExecutionProhibitionContract {
  public static getContract() {
    return {
      physicalExecutionProhibitionContractGenerated: true,
      realExecutionGateUnlocked: false,
      realAuthorizationTokenIssued: false,
      description: 'Modelar contrato de proibição de execução física. Não destravar gate real. Não emitir token real.'
    };
  }
}
