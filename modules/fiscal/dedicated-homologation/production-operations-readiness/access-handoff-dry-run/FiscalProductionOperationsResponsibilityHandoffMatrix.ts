export class FiscalProductionOperationsResponsibilityHandoffMatrix {
  public static getMatrix() {
    return {
      responsibilityHandoffMatrixGenerated: true,
      realOperatorNotified: false,
      webhookSent: false,
      description: 'Modelar responsabilidades de operação sem delegação real. Não notificar operador real.'
    };
  }
}
