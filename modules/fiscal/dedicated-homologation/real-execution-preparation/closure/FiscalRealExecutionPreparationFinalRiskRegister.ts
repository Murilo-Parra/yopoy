export class FiscalRealExecutionPreparationFinalRiskRegister {
  public static getRisks() {
    return [
      { id: 'R-EPC-01', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Closure explicit logic states preparation ONLY, no authorization.', blockerForRealExecution: true },
      { id: 'R-EPC-02', severity: 'HIGH', probability: 'LOW', impact: 'CRITICAL', mitigation: 'Dry-run commands are not executable text.', blockerForRealExecution: true },
      { id: 'R-EPC-03', severity: 'HIGH', probability: 'LOW', impact: 'HIGH', mitigation: 'Explicit module boundary prevents start execution phase.', blockerForRealExecution: true },
      { id: 'R-EPC-04', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Redacted strings prevent secret leak.', blockerForRealExecution: true },
      { id: 'R-EPC-05', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Sefaz mock objects explicitly used before boundary.', blockerForRealExecution: true },
      { id: 'R-EPC-06', severity: 'CRITICAL', probability: 'LOW', impact: 'CRITICAL', mitigation: 'Prod V2 flags isolated and blocked.', blockerForRealExecution: true },
      { id: 'R-EPC-07', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Alerts active if out-of-band script runs.', blockerForRealExecution: true }
    ];
  }
}
