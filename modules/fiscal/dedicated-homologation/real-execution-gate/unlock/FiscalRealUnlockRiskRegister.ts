export class FiscalRealUnlockRiskRegister {
  public static getRisks() {
    return [
      { id: 'R-UG-01', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'Flags explicitly state unlock is simulation only.', blockerForRealUnlock: true },
      { id: 'R-UG-02', severity: 'CRITICAL', probability: 'LOW', impact: 'CRITICAL', mitigation: 'Policy enforces false on bypass parameters.', blockerForRealUnlock: true },
      { id: 'R-UG-03', severity: 'HIGH', probability: 'LOW', impact: 'HIGH', mitigation: 'Real execution remains strictly unapproved in result shape.', blockerForRealUnlock: true },
      { id: 'R-UG-04', severity: 'HIGH', probability: 'LOW', impact: 'HIGH', mitigation: 'Force flags are checked and act as blockers.', blockerForRealUnlock: true },
      { id: 'R-UG-05', severity: 'CRITICAL', probability: 'LOW', impact: 'HIGH', mitigation: 'IaC pipeline waits for real flags which are hardcoded false.', blockerForRealUnlock: true },
      { id: 'R-UG-06', severity: 'HIGH', probability: 'LOW', impact: 'HIGH', mitigation: 'Vault provisioning is still false.', blockerForRealUnlock: true },
      { id: 'R-UG-07', severity: 'HIGH', probability: 'LOW', impact: 'MEDIUM', mitigation: 'Sefaz called false ensures mock behavior only.', blockerForRealUnlock: true },
      { id: 'R-UG-08', severity: 'CRITICAL', probability: 'LOW', impact: 'CRITICAL', mitigation: 'V2 flags are explicitly false.', blockerForRealUnlock: true }
    ];
  }
}
