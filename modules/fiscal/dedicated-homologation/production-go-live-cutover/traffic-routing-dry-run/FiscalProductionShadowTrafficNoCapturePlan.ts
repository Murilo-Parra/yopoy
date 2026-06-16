export class FiscalProductionShadowTrafficNoCapturePlan {
  public static getPlan() {
    return {
      shadowTrafficNoCapturePlanGenerated: true,
      realShadowTrafficEnabled: false,
      realRequestDuplicated: false,
      realPayloadCaptured: false,
      description: 'Modelar shadow traffic sem captura real. Não duplicar request real. Não capturar request/response/payload real.'
    };
  }
}
