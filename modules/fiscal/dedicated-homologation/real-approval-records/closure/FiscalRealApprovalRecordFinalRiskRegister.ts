export class FiscalRealApprovalRecordFinalRiskRegister {
  public static getRisks() {
    return [
      { id: 'R-ARC-01', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Closure enforces all approval/created flags to false.', blockerForRealPersistence: true, blockerForRealExecution: true },
      { id: 'R-ARC-02', severity: 'HIGH', probability: 'LOW', impact: 'MEDIUM', mitigation: 'Evidence package strictly marked as administrative documentation.', blockerForRealPersistence: true, blockerForRealExecution: true },
      { id: 'R-ARC-03', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Dry-run repository is volatile and flushed securely.', blockerForRealPersistence: true, blockerForRealExecution: true },
      { id: 'R-ARC-04', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Schema plan lacks executable implementation paths without new gates.', blockerForRealPersistence: true, blockerForRealExecution: true },
      { id: 'R-ARC-05', severity: 'HIGH', probability: 'LOW', impact: 'HIGH', mitigation: 'Deep scrubbing applied to evidence fields to prevent secret exposure.', blockerForRealPersistence: true, blockerForRealExecution: true },
      { id: 'R-ARC-06', severity: 'CRITICAL', probability: 'LOW', impact: 'CRITICAL', mitigation: 'Production flags strongly isolated from any closure inputs.', blockerForRealPersistence: true, blockerForRealExecution: true }
    ];
  }
}
