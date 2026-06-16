export class FiscalRealApprovalSchemaDiffService {
  public static generateDiff() {
    return {
      schemaDiffGenerated: true,
      realDatabaseConnected: false,
      introspectionExecuted: false,
      diff: {
        projectedChanges: [
          'Add table fiscal_real_approval_records (Dry-Run)'
        ],
        notes: 'Simulated diff. No real database queries performed.'
      }
    };
  }
}
