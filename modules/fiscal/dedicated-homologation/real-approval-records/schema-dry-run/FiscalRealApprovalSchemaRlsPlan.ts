export class FiscalRealApprovalSchemaRlsPlan {
  public static generatePlan() {
    return {
      rlsPlanGenerated: true,
      rlsApplied: false,
      createPolicyExecuted: false,
      alterPolicyExecuted: false,
      policies: [
        {
          name: 'tenant_isolation_policy',
          description: 'Isolate records by company_id',
          pseudoCommand: 'PSEUDO_CREATE_POLICY IF company_id MATCHES session.company_id'
        }
      ]
    };
  }
}
