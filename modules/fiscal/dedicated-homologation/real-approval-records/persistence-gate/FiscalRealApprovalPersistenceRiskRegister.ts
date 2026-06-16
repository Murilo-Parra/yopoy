export class FiscalRealApprovalPersistenceRiskRegister {
  public static getRisks() {
    return [
      { id: 'R-APG-01', severity: 'HIGH', probability: 'LOW', impact: 'HIGH', mitigation: 'Blueprint explicitly labeled as non-persistent' },
      { id: 'R-APG-02', severity: 'HIGH', probability: 'LOW', impact: 'HIGH', mitigation: 'Schema contract lacks valid migration scripts internally' },
      { id: 'R-APG-03', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Audit trail clearly mocked and labeled' },
      { id: 'R-APG-04', severity: 'HIGH', probability: 'LOW', impact: 'MEDIUM', mitigation: 'Sanitization enforced' },
      { id: 'R-APG-05', severity: 'CRITICAL', probability: 'LOW', impact: 'CRITICAL', mitigation: 'Production flags restricted' }
    ];
  }
}
