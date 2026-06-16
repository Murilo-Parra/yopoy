export class FiscalProductionConcurrencyPoolNoOpenPlan {
  public static getPlan() {
    return {
      concurrencyPoolNoOpenPlanGenerated: true,
      realConcurrencyPoolOpened: false,
      description: 'Modelar pool de concorrência sem abertura real.'
    };
  }
}
