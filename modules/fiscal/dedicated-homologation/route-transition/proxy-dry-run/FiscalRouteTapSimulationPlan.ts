export class FiscalRouteTapSimulationPlan {
  public static generatePlan() {
    return {
      tapSimulationGenerated: true,
      tapInstalled: false,
      requestCaptured: false,
      responseCaptured: false,
      description: 'Simulation of observation tap. Does not capture real requests or responses.'
    };
  }
}
