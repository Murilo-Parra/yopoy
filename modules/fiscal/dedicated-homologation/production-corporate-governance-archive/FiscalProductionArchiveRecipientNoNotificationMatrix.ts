export class FiscalProductionArchiveRecipientNoNotificationMatrix {
  public static getMatrix() {
    return {
      archiveRecipientNoNotificationMatrixGenerated: true,
      realStakeholderNotified: false,
      realDirectorNotified: false,
      realAuditorNotified: false,
      realRegulatorNotified: false,
      description: 'Simular destinatários sem notificação real.'
    };
  }
}
