export class FiscalProductionNoActivationObservationContract {
  public static getContract() {
    return {
      noActivationObservationContractGenerated: true,
      productionV2Activated: false,
      trafficChanged: false,
      description: 'Estabelecer contrato de observação sem ativação. Não ativar Produção V2. Não alterar tráfego real.'
    };
  }
}
