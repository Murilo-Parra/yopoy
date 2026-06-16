export class FiscalProductionStabilizationWindowSimulationPlan {
  public static getPlan() {
    return {
      stabilizationWindowSimulationPlanGenerated: true,
      realIncidentOpened: false,
      webhookSent: false,
      description: 'Modelar janela de estabilização simulada. Não abrir incidente real. Não enviar notificação real.'
    };
  }
}
