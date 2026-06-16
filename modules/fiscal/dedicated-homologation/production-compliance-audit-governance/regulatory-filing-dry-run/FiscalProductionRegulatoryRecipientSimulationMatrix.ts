export class FiscalProductionRegulatoryRecipientSimulationMatrix {
  public static getMatrix() {
    return {
      recipientSimulationMatrixGenerated: true,
      realRegulatorNotified: false,
      realAuditorNotified: false,
      emailSent: false,
      description: 'Modelar destinatários regulatórios sem notificação real. Não notificar regulador, auditor, stakeholder, aprovador ou cliente.'
    };
  }
}
