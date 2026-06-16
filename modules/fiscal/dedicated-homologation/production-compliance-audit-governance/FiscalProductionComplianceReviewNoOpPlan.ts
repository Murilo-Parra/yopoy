export class FiscalProductionComplianceReviewNoOpPlan {
  public static getPlan() {
    return {
      complianceReviewNoOpPlanGenerated: true,
      realAuthorizationGranted: false,
      realExecutionGateUnlocked: false,
      description: 'Modelar revisão de compliance sem aprovação real. Não conceder autorização. Não destravar gate.'
    };
  }
}
