export class FiscalProductionSefazAdapterNoCallPlan {
  public static getPlan() {
    return {
      sefazAdapterNoCallPlanGenerated: true,
      realSefazCalled: false,
      description: 'Modelar adaptador SEFAZ futuro sem chamada real. Não consultar autorização, status, recibo, protocolo ou contingência real.'
    };
  }
}
