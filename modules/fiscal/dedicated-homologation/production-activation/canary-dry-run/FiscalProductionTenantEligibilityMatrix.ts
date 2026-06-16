export class FiscalProductionTenantEligibilityMatrix {
  public static generateMatrix() {
    return {
      tenantEligibilityGenerated: true,
      canaryActivated: false,
      productionV2Activated: false,
      realAuthorizationGranted: false,
      criteriaConfigured: [
        'Authorization documental',
        'Rollback documental',
        'Legal Audit Trail documental',
        'Readiness documental',
        'Kill-switch documental'
      ],
      description: 'Simulated tenant eligibility. Release real is not activated, results are not persisted.'
    };
  }
}
