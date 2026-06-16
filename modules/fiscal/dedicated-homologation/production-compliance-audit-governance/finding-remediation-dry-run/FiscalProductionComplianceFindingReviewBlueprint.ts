export class FiscalProductionComplianceFindingReviewBlueprint {
  public static getBlueprint() {
    return {
      findingReviewBlueprintGenerated: true,
      realFindingCreated: false,
      realFindingRecordPersisted: false,
      description: 'Modelar revisão documental de findings. Não criar finding real. Não persistir finding real.'
    };
  }
}
