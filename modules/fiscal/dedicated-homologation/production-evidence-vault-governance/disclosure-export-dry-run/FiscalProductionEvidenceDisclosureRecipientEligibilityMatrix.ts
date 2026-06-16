export class FiscalProductionEvidenceDisclosureRecipientEligibilityMatrix {
  public static getMatrix() {
    return {
      recipientEligibilityMatrixGenerated: true,
      realAuditorNotified: false,
      realStakeholderNotified: false,
      description: 'Modelar elegibilidade de destinatários sem notificação real. Não enviar e-mail, webhook, Slack, WhatsApp, pager ou Opsgenie.'
    };
  }
}
