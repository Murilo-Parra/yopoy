export class FiscalProductionCommandCenterNoExternalIntegrationPlan {
  public static getPlan() {
    return {
      commandCenterNoExternalIntegrationPlanGenerated: true,
      realSefazCalled: false,
      realExternalApiCalled: false,
      description: 'Reforçar bloqueio de SEFAZ, API externa, adapter HTTP, callback, webhook e notification provider.'
    };
  }
}
