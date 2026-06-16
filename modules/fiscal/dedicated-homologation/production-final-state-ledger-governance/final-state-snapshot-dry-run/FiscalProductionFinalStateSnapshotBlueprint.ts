export class FiscalProductionFinalStateSnapshotBlueprint {
  public static getBlueprint() {
    return {
      finalStateSnapshotBlueprintGenerated: true,
      realSnapshotCreated: false,
      realSnapshotPersisted: false,
      description: 'Modelar snapshot final virtual. Não criar snapshot real. Não persistir snapshot real.'
    };
  }
}
