export class FiscalProductionGoLiveCutoverFinalChecklist {
  public static getChecklist() {
    return {
      finalChecklistGenerated: true,
      routeToV2: false,
      routeToLegacy: true,
      productionV2Activated: false,
      trafficChanged: false,
      description: 'Consolidar checklist final de não ativação.'
    };
  }
}
