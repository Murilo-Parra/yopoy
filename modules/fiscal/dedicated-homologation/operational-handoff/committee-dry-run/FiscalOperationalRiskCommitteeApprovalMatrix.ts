export class FiscalOperationalRiskCommitteeApprovalMatrix {
  public static generateMatrix() {
    return {
      approvalMatrixGenerated: true,
      committeeApprovalGranted: false,
      realAuthorizationGranted: false,
      description: 'Model of future approval matrix. Does not persist real approval.'
    };
  }
}
