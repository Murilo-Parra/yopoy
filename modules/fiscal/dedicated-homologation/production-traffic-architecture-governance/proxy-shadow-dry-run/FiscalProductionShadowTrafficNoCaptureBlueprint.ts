export class FiscalProductionShadowTrafficNoCaptureBlueprint {
  public static getBlueprint() {
    return {
      shadowTrafficNoCaptureBlueprintGenerated: true,
      realShadowTrafficEnabled: false,
      realRequestCaptured: false,
      realPayloadCaptured: false,
      description: 'Modelar shadow traffic sem captura real. Não ativar shadow traffic real. Não capturar request/response/payload real.'
    };
  }
}
