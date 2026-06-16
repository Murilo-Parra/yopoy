export class FiscalRealApprovalSchemaRiskRegister {
  public static getRisks() {
    return [
      { id: 'R-ASD-01', severity: 'HIGH', impact: 'HIGH', mitigation: 'Schema dry-run only returns structural metadata, not scripts' },
      { id: 'R-ASD-02', severity: 'MEDIUM', impact: 'MEDIUM', mitigation: 'Commands prefixed with PSEUDO_' },
      { id: 'R-ASD-03', severity: 'HIGH', impact: 'HIGH', mitigation: 'RLS enforced at database layer, not possible without explicit DB module' },
      { id: 'R-ASD-04', severity: 'MEDIUM', impact: 'LOW', mitigation: 'Introspection explicitly bypassed locally' },
      { id: 'R-ASD-05', severity: 'CRITICAL', impact: 'CRITICAL', mitigation: 'Production flags restricted inside logic' }
    ];
  }
}
