export class FiscalRealApprovalPersistenceSchemaContract {
  public static generateContract() {
    return {
      schemaContractGenerated: true,
      schemaApplied: false,
      migrationExecuted: false,
      ddlExecuted: false,
      dmlExecuted: false,
      realDatabaseConnected: false,
      contractDetails: {
        tableName: 'fiscal_real_approval_records',
        allowedFields: [
          'id',
          'company_id',
          'request_id',
          'requested_by',
          'approver_a',
          'approver_b',
          'approval_status',
          'risk_summary',
          'blocker_summary',
          'governance_notes',
          'created_at',
          'reviewed_at',
          'version'
        ],
        prohibitedFields: [
          'payload bruto',
          'raw request',
          'command',
          'DATABASE_URL',
          'privateKey',
          'pfx',
          'password',
          'token',
          'certificate',
          'XML bruto',
          'PDF/base64 extenso',
          'segredo real'
        ],
        plannedConstraints: [
          'approver_a != approver_b',
          'requested_by != approver_a',
          'requested_by != approver_b'
        ],
        plannedRls: [
          'Tenancy isolation by company_id'
        ],
        plannedIndexes: [
          'company_id', 'request_id', 'status'
        ]
      },
      declarations: {
        noRealTableCreated: true,
        noMigrationExecuted: true,
        noDdlExecuted: true,
        noDmlExecuted: true,
        noRealDatabaseConnected: true
      }
    };
  }
}
