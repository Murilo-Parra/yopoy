export class FiscalRouteShadowTrafficSimulationPlan {
  public static generatePlan() {
    return {
      shadowTrafficPlanGenerated: true,
      shadowTrafficSimulated: true,
      shadowTrafficEnabled: false,
      realTrafficMirrored: false,
      requestDuplicated: false,
      requestCaptured: false,
      responseCaptured: false,
      description: 'Metadata-only shadow traffic plan simulation. No actual request/response is touched.'
    };
  }
}
