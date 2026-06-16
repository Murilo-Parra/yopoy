export class FiscalProductionShadowTrafficNoActivationPlan {
  public static getPlan() {
    return {
      shadowTrafficNoActivationPlanGenerated: true,
      realMirrorEnabled: false,
      realSnifferEnabled: false,
      realShadowTrafficEnabled: false,
      description: 'Modelar mirror, sniffer e shadow traffic sem ativação.'
    };
  }
}
