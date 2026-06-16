export class FiscalProductionCorporateGovernanceNoNotificationHandoffService {
  public static getHandoff() {
    return {
      noNotificationHandoffGenerated: true,
      realStakeholderNotified: false,
      realDirectorNotified: false,
      realAuditorNotified: false,
      realRegulatorNotified: false,
      realWebhookSent: false,
      realEmailSent: false,
      description: 'Simular handoff final sem notificação real.'
    };
  }
}
