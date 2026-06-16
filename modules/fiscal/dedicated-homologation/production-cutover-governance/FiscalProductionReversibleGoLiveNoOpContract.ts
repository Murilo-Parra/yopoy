export class FiscalProductionReversibleGoLiveNoOpContract {
  public static getContract() {
    return {
      reversibleGoLiveNoOpContractGenerated: true,
      realGoLiveExecuted: false,
      productionV2Activated: false,
      description: 'Modelagem do contrato de go-live reversível em no-op. Não executa go-live real. Não ativa Produção V2.'
    };
  }
}
