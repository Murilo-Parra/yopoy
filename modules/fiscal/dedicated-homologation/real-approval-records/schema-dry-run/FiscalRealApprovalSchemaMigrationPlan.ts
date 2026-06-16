export class FiscalRealApprovalSchemaMigrationPlan {
  public static generatePlan() {
    return {
      migrationPlanGenerated: true,
      schemaApplied: false,
      migrationExecuted: false,
      ddlExecuted: false,
      createTableExecuted: false,
      realDatabaseConnected: false,
      declarations: {
        isMockedTextualPlan: true,
        realTableNotCreated: true,
        realDatabaseNotConnected: true,
        requiresExplicitModuleForRealMigration: true
      },
      plannedFields: [
        'id',
        'company_id',
        'request_id',
        'requested_by',
        'approver_a',
        'approver_b',
        'approval_status',
        'approval_version',
        'governance_notes',
        'legal_audit_summary',
        'created_at',
        'updated_at',
        'reviewed_at'
      ]
    };
  }
}
