export class FiscalRealExecutionPreparationRiskRegister {
  public static getRisks() {
    return [
      { id: 'R-EP-01', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Flags explicitly state envelope is not actionable.', blockerForRealExecution: true },
      { id: 'R-EP-02', severity: 'HIGH', probability: 'LOW', impact: 'CRITICAL', mitigation: 'Blockers prevent execution even when force flags are enabled.', blockerForRealExecution: true },
      { id: 'R-EP-03', severity: 'HIGH', probability: 'LOW', impact: 'HIGH', mitigation: 'Envelope is an abstraction format without native command syntax.', blockerForRealExecution: true },
      { id: 'R-EP-04', severity: 'CRITICAL', probability: 'LOW', impact: 'CRITICAL', mitigation: 'Validation layer strips any actual credentials or DATABASE_URL inputs.', blockerForRealExecution: true },
      { id: 'R-EP-05', severity: 'HIGH', probability: 'LOW', impact: 'MEDIUM', mitigation: 'Vault required prior to certificate parsing constraint.', blockerForRealExecution: true },
      { id: 'R-EP-06', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Sefaz mock boundaries strictly active.', blockerForRealExecution: true },
      { id: 'R-EP-07', severity: 'CRITICAL', probability: 'LOW', impact: 'CRITICAL', mitigation: 'V2 flags permanently locked strictly disabled.', blockerForRealExecution: true }
    ];
  }
}
