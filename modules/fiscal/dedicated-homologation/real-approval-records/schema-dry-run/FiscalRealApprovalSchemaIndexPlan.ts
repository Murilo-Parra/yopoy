export class FiscalRealApprovalSchemaIndexPlan {
  public static generatePlan() {
    return {
      indexPlanGenerated: true,
      createIndexExecuted: false,
      executableSqlIncluded: false,
      indexes: [
        {
          name: 'idx_fiscal_real_approval_records_company_id',
          columns: ['company_id'],
          pseudoCommand: 'PSEUDO_CREATE_INDEX ON company_id'
        },
        {
          name: 'idx_fiscal_real_approval_records_request_id',
          columns: ['request_id'],
          pseudoCommand: 'PSEUDO_CREATE_INDEX ON request_id'
        }
      ]
    };
  }
}
