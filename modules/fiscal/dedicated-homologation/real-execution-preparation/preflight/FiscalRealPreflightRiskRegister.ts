export class FiscalRealPreflightRiskRegister {
  public static getRisks() {
    return [
      { id: 'R-PF-01', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Policy forces preflight to block authorize and unlock explicitly.', blockerForRealExecution: true },
      { id: 'R-PF-02', severity: 'HIGH', probability: 'LOW', impact: 'CRITICAL', mitigation: 'Validation strictly filters out shell commands.', blockerForRealExecution: true },
      { id: 'R-PF-03', severity: 'HIGH', probability: 'LOW', impact: 'HIGH', mitigation: 'Command fragments evaluated recursively before log entry.', blockerForRealExecution: true },
      { id: 'R-PF-04', severity: 'CRITICAL', probability: 'LOW', impact: 'CRITICAL', mitigation: 'Evidence payload sanitizes strings matching vault or key signatures.', blockerForRealExecution: true },
      { id: 'R-PF-05', severity: 'HIGH', probability: 'LOW', impact: 'MEDIUM', mitigation: 'Sefaz endpoints strictly mocked.', blockerForRealExecution: true },
      { id: 'R-PF-06', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'V2 flags securely blocked.', blockerForRealExecution: true }
    ];
  }
}
