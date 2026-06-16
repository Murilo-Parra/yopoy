export class FiscalProductionRecipientDisclosureNoNotifyMatrix {
  public static getMatrix() {
    return {
      recipientDisclosureNoNotifyMatrixGenerated: true,
      realRecipientNotified: false,
      realStakeholderNotified: false,
      realAuditorNotified: false,
      realRegulatorNotified: false,
      description: 'Bloquear notificação real para qualquer destinatário.'
    };
  }
}
