export class FiscalRealApprovalRecordDryRunRiskRegister {
  public static getRisks() {
    return [
      { id: 'R-ARD-01', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Policy forces persistent flags to false (approvalRecordPersisted).', blockerForRealExecution: true },
      { id: 'R-ARD-02', severity: 'HIGH', probability: 'LOW', impact: 'HIGH', mitigation: 'Audit trails are clearly mocked and isolated in memory.', blockerForRealExecution: true },
      { id: 'R-ARD-03', severity: 'CRITICAL', probability: 'LOW', impact: 'MEDIUM', mitigation: 'Sanitizers prevent raw data strings from evaluation flows.', blockerForRealExecution: true },
      { id: 'R-ARD-04', severity: 'HIGH', probability: 'LOW', impact: 'HIGH', mitigation: 'Schema plans are strictly structural mocks and contain no executable code.', blockerForRealExecution: true },
      { id: 'R-ARD-05', severity: 'CRITICAL', probability: 'LOW', impact: 'CRITICAL', mitigation: 'Production flags are overridden and blocked.', blockerForRealExecution: true }
    ];
  }
}
