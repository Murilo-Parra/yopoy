export class FiscalRealAuthorizationFinalRiskRegister {
  public static getRisks() {
    return [
      { id: 'R-RAC-01', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Closure explicitly returns approvedForRealExecutionAuthorization: false.', blockerForRealExecution: true },
      { id: 'R-RAC-02', severity: 'HIGH', probability: 'LOW', impact: 'CRITICAL', mitigation: 'Simulation returns false for dualApprovalCompleted.', blockerForRealExecution: true },
      { id: 'R-RAC-03', severity: 'HIGH', probability: 'LOW', impact: 'HIGH', mitigation: 'Envelope is marked executable: false.', blockerForRealExecution: true },
      { id: 'R-RAC-04', severity: 'CRITICAL', probability: 'LOW', impact: 'CRITICAL', mitigation: 'Alerts prevent human approvers out-of-band commands.', blockerForRealExecution: true },
      { id: 'R-RAC-05', severity: 'HIGH', probability: 'LOW', impact: 'HIGH', mitigation: 'Keys masked by active sanitizers.', blockerForRealExecution: true },
      { id: 'R-RAC-06', severity: 'CRITICAL', probability: 'LOW', impact: 'MEDIUM', mitigation: 'SEFAZ boundaries heavily mocked.', blockerForRealExecution: true },
      { id: 'R-RAC-07', severity: 'CRITICAL', probability: 'LOW', impact: 'CRITICAL', mitigation: 'V2 flags securely blocked.', blockerForRealExecution: true }
    ];
  }
}
