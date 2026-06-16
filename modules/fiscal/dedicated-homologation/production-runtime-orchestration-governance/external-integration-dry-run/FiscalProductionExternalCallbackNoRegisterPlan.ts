export class FiscalProductionExternalCallbackNoRegisterPlan {
  public static getPlan() {
    return {
      externalCallbackNoRegisterPlanGenerated: true,
      realCallbackRegistered: false,
      description: 'Modelar callbacks externos sem registro real. Não registrar endpoint real de callback.'
    };
  }
}
