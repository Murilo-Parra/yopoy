export class FiscalProductionPostGoLiveStabilizationFinalChecklist {
  public static getChecklist() {
    return {
      finalChecklistGenerated: true,
      routeToV2: false,
      routeToLegacy: true,
      trafficChanged: false,
      productionV2Activated: false,
      description: 'Consolidar checklist final de não ativação.'
    };
  }
}
