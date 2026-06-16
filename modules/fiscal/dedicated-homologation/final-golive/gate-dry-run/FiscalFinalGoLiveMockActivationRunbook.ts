export class FiscalFinalGoLiveMockActivationRunbook {
  public static generateRunbook() {
    return {
      mockActivationRunbookGenerated: true,
      realRunbookExecuted: false,
      productionV2Activated: false,
      description: 'Mock activation runbook. Not a real runbook. Does not create workers, schedulers, notifications, tickets, incidents, or executable commands.'
    };
  }
}
