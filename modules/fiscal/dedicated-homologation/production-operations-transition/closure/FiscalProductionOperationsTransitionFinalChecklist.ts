export class FiscalProductionOperationsTransitionFinalChecklist {
  public static getChecklist() {
    return {
      finalChecklistGenerated: true,
      routeToV2: false,
      routeToLegacy: true,
      trafficChanged: false,
      description: 'Checklist final de não ativação.'
    };
  }
}
