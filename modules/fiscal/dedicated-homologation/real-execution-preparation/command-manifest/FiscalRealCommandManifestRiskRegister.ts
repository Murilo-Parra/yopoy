export class FiscalRealCommandManifestRiskRegister {
  public static getRisks() {
    return [
      { id: 'R-CM-01', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Dry-run definitions explicitly mask real command keywords.', blockerForRealExecution: true },
      { id: 'R-CM-02', severity: 'HIGH', probability: 'LOW', impact: 'CRITICAL', mitigation: 'Validators reject common infrastructure shell signatures.', blockerForRealExecution: true },
      { id: 'R-CM-03', severity: 'HIGH', probability: 'LOW', impact: 'HIGH', mitigation: 'Shell output is completely restricted and never yielded.', blockerForRealExecution: true },
      { id: 'R-CM-04', severity: 'CRITICAL', probability: 'LOW', impact: 'CRITICAL', mitigation: 'Sanitization recursively blocks PFX, keys, tokens.', blockerForRealExecution: true },
      { id: 'R-CM-05', severity: 'HIGH', probability: 'LOW', impact: 'MEDIUM', mitigation: 'DATABASE_URL matches actively stripped from requests.', blockerForRealExecution: true },
      { id: 'R-CM-06', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Sefaz endpoints strictly mocked out.', blockerForRealExecution: true },
      { id: 'R-CM-07', severity: 'CRITICAL', probability: 'LOW', impact: 'CRITICAL', mitigation: 'Feature flags require multi-module signed payloads before shift.', blockerForRealExecution: true }
    ];
  }
}
