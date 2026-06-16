export class FiscalRealDualApprovalRiskRegister {
  public static getRisks() {
    return [
      { id: 'R-DA-01', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Policy explicitly overrides any internal returns with mocked status.', blockerForRealExecution: true },
      { id: 'R-DA-02', severity: 'HIGH', probability: 'LOW', impact: 'HIGH', mitigation: 'Segregation of duties actively blocks same user requests.', blockerForRealExecution: true },
      { id: 'R-DA-03', severity: 'CRITICAL', probability: 'LOW', impact: 'CRITICAL', mitigation: 'Approver manually forced to a strict boundary path.', blockerForRealExecution: true },
      { id: 'R-DA-04', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Recursive sanitization purges key-like strings.', blockerForRealExecution: true },
      { id: 'R-DA-05', severity: 'CRITICAL', probability: 'LOW', impact: 'MEDIUM', mitigation: 'Network boundaries strictly mock SEFAZ endpoints.', blockerForRealExecution: true },
      { id: 'R-DA-06', severity: 'CRITICAL', probability: 'LOW', impact: 'CRITICAL', mitigation: 'V2 properties securely disconnected from any input.', blockerForRealExecution: true }
    ];
  }
}
