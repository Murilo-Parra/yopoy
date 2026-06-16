export class FiscalProductionIncidentCommunicationNoSendPlan {
  public static getPlan() {
    return {
      incidentCommunicationNoSendPlanGenerated: true,
      realCustomerNotified: false,
      realStakeholderNotified: false,
      description: 'Modelar comunicação de incidente sem envio real. Não notificar cliente, stakeholder, operador ou aprovador.'
    };
  }
}
