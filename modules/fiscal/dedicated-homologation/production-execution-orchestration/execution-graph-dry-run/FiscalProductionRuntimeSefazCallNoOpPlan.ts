export class FiscalProductionRuntimeSefazCallNoOpPlan {
  public static generatePlan() {
    return {
      sefazCallNoOpPlanGenerated: true,
      realSefazCalled: false,
      realEndpointCalled: false,
      description: 'Modelagem da chamada SEFAZ futura como no-op. Não chama SEFAZ real nem endpoint externo real.'
    };
  }
}
