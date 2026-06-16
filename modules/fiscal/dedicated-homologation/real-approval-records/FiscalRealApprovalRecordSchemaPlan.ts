export class FiscalRealApprovalRecordSchemaPlan {
  public static generatePlan() {
    return {
      schemaPlanGenerated: true,
      schemaApplied: false,
      migrationExecuted: false,
      ddlExecuted: false,
      dmlExecuted: false,
      approvalRecordPersisted: false,
      realDatabaseConnected: false,
      plan: {
        tableName: 'fiscal_real_approval_records_future',
        plannedFields: [
          { name: 'id', type: 'uuid', primaryKey: true },
          { name: 'request_id', type: 'uuid', foreignKey: true },
          { name: 'company_id', type: 'uuid', indexed: true },
          { name: 'requester_id', type: 'uuid' },
          { name: 'approver_a_id', type: 'uuid' },
          { name: 'approver_b_id', type: 'uuid' },
          { name: 'status', type: 'varchar(50)' },
          { name: 'signature_a', type: 'text' },
          { name: 'signature_b', type: 'text' },
          { name: 'created_at', type: 'timestamp with time zone' },
          { name: 'updated_at', type: 'timestamp with time zone' }
        ],
        plannedConstraints: [
          'approver_a_id != approver_b_id',
          'requester_id != approver_a_id',
          'requester_id != approver_b_id'
        ],
        plannedRls: [
          'Owner company isolation'
        ],
        plannedIndexes: [
          'company_id', 'request_id'
        ]
      },
      declarations: {
        noRealTableCreated: true,
        noMigrationRun: true,
        noDdlExecuted: true,
        noDmlExecuted: true
      }
    };
  }
}
