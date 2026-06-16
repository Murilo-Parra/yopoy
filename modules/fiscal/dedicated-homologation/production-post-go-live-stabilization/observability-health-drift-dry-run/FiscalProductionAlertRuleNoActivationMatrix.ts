export class FiscalProductionAlertRuleNoActivationMatrix {
  public static getMatrix() {
    return {
      alertRuleNoActivationMatrixGenerated: true,
      realAlertCreated: false,
      realAlertRuleActivated: false,
      description: 'Modelar regras de alerta sem ativação. Não criar alerta real. Não enviar notificação real.'
    };
  }
}
