export class FiscalProductionLiveTelemetryNoReadPlan {
  public static getPlan() {
    return {
      liveTelemetryNoReadPlanGenerated: true,
      realTelemetryRead: false,
      realPayloadCaptured: false,
      description: 'Modelar telemetria live sem leitura real. Não ler logs, traces, request, response ou payload.'
    };
  }
}
