export class FiscalDay2IncidentResponseSimulationPlan {
  public static getPlan() {
    return {
      incidentResponseSimulationPlanGenerated: true,
      realIncidentOpened: false,
      productionAlertCreated: false,
      description: 'Modelagem de resposta a incidente day-2 como simulação administrativa. Não abre incidente real. Não cria alerta real.'
    };
  }
}
