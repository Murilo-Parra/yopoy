export class FiscalRealApprovalDmlRiskRegister {
  public static getRisks() {
    return [
      { id: 'R-ADM-01', severity: 'HIGH', impact: 'HIGH', mitigation: 'Seed data generated is explicitly dummy data, not persistence scripts.' },
      { id: 'R-ADM-02', severity: 'HIGH', impact: 'HIGH', mitigation: 'Pseudo-mutations are text-only.' },
      { id: 'R-ADM-03', severity: 'MEDIUM', impact: 'MEDIUM', mitigation: 'Diff service hides actual raw values.' },
      { id: 'R-ADM-04', severity: 'CRITICAL', impact: 'HIGH', mitigation: 'Commit plan explicitly disabled transactions.' },
      { id: 'R-ADM-05', severity: 'CRITICAL', impact: 'CRITICAL', mitigation: 'Production flags restricted inside logic.' }
    ];
  }
}
