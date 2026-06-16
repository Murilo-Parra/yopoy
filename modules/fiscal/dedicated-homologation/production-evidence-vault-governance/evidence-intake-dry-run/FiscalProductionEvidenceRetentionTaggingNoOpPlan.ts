export class FiscalProductionEvidenceRetentionTaggingNoOpPlan {
  public static getPlan() {
    return {
      retentionTaggingNoOpPlanGenerated: true,
      retentionRecordCreated: false,
      description: 'Modelar tagging de retenção sem record real.'
    };
  }
}
