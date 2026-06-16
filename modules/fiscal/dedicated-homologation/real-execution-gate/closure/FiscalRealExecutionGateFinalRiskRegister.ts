export class FiscalRealExecutionGateFinalRiskRegister {
  public static getRisks() {
    return [
      { id: 'R-EGC-01', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Flags explicitly confirm readiness handoff, not real unlock.', blockerForRealExecution: true },
      { id: 'R-EGC-02', severity: 'HIGH', probability: 'LOW', impact: 'CRITICAL', mitigation: 'Blockers log humans attempting to bypass via terminal.', blockerForRealExecution: true },
      { id: 'R-EGC-03', severity: 'HIGH', probability: 'LOW', impact: 'HIGH', mitigation: 'Payload generation prevents valid syntax from leaving console.', blockerForRealExecution: true },
      { id: 'R-EGC-04', severity: 'CRITICAL', probability: 'LOW', impact: 'CRITICAL', mitigation: 'Secret management explicitly relies on formal vaulting yet to be provisioned.', blockerForRealExecution: true },
      { id: 'R-EGC-05', severity: 'HIGH', probability: 'LOW', impact: 'HIGH', mitigation: 'Validation ensures environment is active before PFX load.', blockerForRealExecution: true },
      { id: 'R-EGC-06', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'SEFAZ mock boundary explicitly enforced and flagged if breached.', blockerForRealExecution: true },
      { id: 'R-EGC-07', severity: 'HIGH', probability: 'LOW', impact: 'MEDIUM', mitigation: 'Document rendering confined to mock bounds until real unlock phase.', blockerForRealExecution: true },
      { id: 'R-EGC-08', severity: 'CRITICAL', probability: 'LOW', impact: 'CRITICAL', mitigation: 'V2 flags permanently disabled until explicit command.', blockerForRealExecution: true },
      { id: 'R-EGC-09', severity: 'HIGH', probability: 'LOW', impact: 'HIGH', mitigation: 'Handoff outlines rollback requirement for future phases.', blockerForRealExecution: true },
      { id: 'R-EGC-10', severity: 'MEDIUM', probability: 'LOW', impact: 'MEDIUM', mitigation: 'In-memory audit will be supplanted by robust persistence pre-execution.', blockerForRealExecution: true }
    ];
  }
}
