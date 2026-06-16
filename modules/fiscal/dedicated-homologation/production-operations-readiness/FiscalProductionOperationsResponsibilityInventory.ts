export class FiscalProductionOperationsResponsibilityInventory {
  public static getInventory() {
    return {
      responsibilityInventoryGenerated: true,
      realOperationsActivated: false,
      webhookSent: false,
      description: 'Consolidar responsabilidades administrativas. Não conceder privilégios reais. Não notificar operadores reais.'
    };
  }
}
