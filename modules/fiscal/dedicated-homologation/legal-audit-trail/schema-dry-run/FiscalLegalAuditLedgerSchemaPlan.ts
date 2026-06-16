export class FiscalLegalAuditLedgerSchemaPlan {
  public static generatePlan() {
    return {
      ledgerSchemaPlanGenerated: true,
      realLedgerCreated: false,
      schemaApplied: false,
      migrationExecuted: false,
      ddlExecuted: false,
      createTableExecuted: false,
      realDatabaseConnected: false,
      plannedFields: [
        'id',
        'company_id',
        'request_id',
        'approval_record_ref',
        'event_type',
        'actor_role',
        'actor_ref',
        'governance_summary',
        'risk_summary',
        'blocker_summary',
        'legal_audit_status',
        'retention_class',
        'version',
        'created_at',
        'reviewed_at'
      ],
      plannedConstraints: [
        'PRIMARY KEY (id)',
        'FOREIGN KEY (company_id) REFERENCES companies(id)',
        'NOT NULL for company_id, event_type, created_at'
      ],
      description: 'This is a ledger schema plan. No real schema was applied, no tables were created, no DDl/DML/migration executed. executableSqlIncluded is false. payloadIncluded is false. sensitiveDataIncluded is false.'
    };
  }
}
