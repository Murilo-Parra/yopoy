export class FiscalLegalCommitteeFinalRecommendation {
  public static generateRecommendation() {
    return {
      finalRecommendationGenerated: true,
      go: false,
      noGo: true,
      approvedForRealCommitteeApproval: false,
      approvedForRealLegalSignOff: false,
      productionV2Activated: false,
      description: 'Simulated final recommendation. go: false, noGo: true for real legal approval.'
    };
  }
}
