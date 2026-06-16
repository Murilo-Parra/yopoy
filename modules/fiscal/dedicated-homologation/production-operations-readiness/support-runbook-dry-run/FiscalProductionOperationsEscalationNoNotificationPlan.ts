export class FiscalProductionOperationsEscalationNoNotificationPlan {
  public static getPlan() {
    return {
      escalationNoNotificationPlanGenerated: true,
      realOperatorNotified: false,
      realSreNotified: false,
      realCustomerNotified: false,
      realStakeholderNotified: false,
      description: 'Modelar escalonamento sem notificação real. Não chamar operador, SRE, cliente ou stakeholder.'
    };
  }
}
