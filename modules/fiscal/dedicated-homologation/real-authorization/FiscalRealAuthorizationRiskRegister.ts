export class FiscalRealAuthorizationRiskRegister {
  public static getRisks() {
    return [
      { id: 'R-RA-01', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Policy explicitly overrides any intake with mocked simulation returns.', blockerForRealExecution: true },
      { id: 'R-RA-02', severity: 'HIGH', probability: 'LOW', impact: 'HIGH', mitigation: 'Envelope is intrinsically marked executable: false.', blockerForRealExecution: true },
      { id: 'R-RA-03', severity: 'CRITICAL', probability: 'LOW', impact: 'CRITICAL', mitigation: 'Modules explicitly require programmatic signatures to bypass mock gate boundaries.', blockerForRealExecution: true },
      { id: 'R-RA-04', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Recursive sanitization purges key-like strings.', blockerForRealExecution: true },
      { id: 'R-RA-05', severity: 'CRITICAL', probability: 'LOW', impact: 'MEDIUM', mitigation: 'Network boundaries strictly mock SEFAZ endpoints.', blockerForRealExecution: true },
      { id: 'R-RA-06', severity: 'CRITICAL', probability: 'LOW', impact: 'CRITICAL', mitigation: 'V2 properties securely disconnected from any input.', blockerForRealExecution: true }
    ];
  }
}
