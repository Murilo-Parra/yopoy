export class FiscalProductionDeletionSuppressionNoExecutePlan {
  public static getPlan() {
    return {
      deletionSuppressionNoExecutePlanGenerated: true,
      realDataDeleted: false,
      description: 'Bloquear deleção real.'
    };
  }
}
