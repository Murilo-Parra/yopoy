export class FiscalRealApprovalRecordRiskRegister {
  public static getRisks() {
    return [
      { id: 'R-AR-01', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Policy forces properties to false (realApprovalRecordCreated).', blockerForRealExecution: true },
      { id: 'R-AR-02', severity: 'HIGH', probability: 'LOW', impact: 'HIGH', mitigation: 'Envelope is marked explicitly as non-executable and unsigned.', blockerForRealExecution: true },
      { id: 'R-AR-03', severity: 'HIGH', probability: 'LOW', impact: 'HIGH', mitigation: 'Schema plan does not contain valid DDL statements.', blockerForRealExecution: true },
      { id: 'R-AR-04', severity: 'CRITICAL', probability: 'LOW', impact: 'MEDIUM', mitigation: 'Deep sanitization purges key-like structures from inputs.', blockerForRealExecution: true },
      { id: 'R-AR-05', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'SEFAZ boundaries are completely unconnected inside this module.', blockerForRealExecution: true },
      { id: 'R-AR-06', severity: 'CRITICAL', probability: 'LOW', impact: 'CRITICAL', mitigation: 'Production flags strictly blocked.', blockerForRealExecution: true }
    ];
  }
}
