export class FiscalProductionGoNoGoApprovalMatrix {
  public static generateMatrix() {
    return {
      goNoGoApprovalMatrixGenerated: true,
      goNoGoSimulationOnly: true,
      approvedForRealCutover: false,
      approvedForProductionV2: false,
      realAuthorizationGranted: false,
      description: 'Documentary GO/NO-GO matrix simulation. Does not grant production authorization.'
    };
  }
}
