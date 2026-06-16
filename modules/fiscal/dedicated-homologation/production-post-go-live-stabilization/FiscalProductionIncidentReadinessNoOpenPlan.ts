export class FiscalProductionIncidentReadinessNoOpenPlan {
  public static getPlan() {
    return {
      incidentReadinessNoOpenPlanGenerated: true,
      realIncidentOpened: false,
      realTicketCreated: false,
      description: 'Modelar prontidão para incidente sem abrir incidente real. Não criar ticket. Não notificar operador.'
    };
  }
}
