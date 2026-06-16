export class FiscalProductionCutoverWindowPlan {
  public static getPlan() {
    return {
      cutoverWindowPlanGenerated: true,
      trafficChanged: false,
      activationBlocked: true,
      description: 'Modelagem da janela futura de cutover. Não abre janela real. Não altera tráfego.'
    };
  }
}
