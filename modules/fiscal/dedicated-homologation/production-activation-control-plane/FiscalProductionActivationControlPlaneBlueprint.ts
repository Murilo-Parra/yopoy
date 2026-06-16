export class FiscalProductionActivationControlPlaneBlueprint {
  public static getBlueprint() {
    return {
      controlPlaneBlueprintGenerated: true,
      realProductionActivationExecuted: false,
      realAuthorizationGranted: false,
      activationBlocked: true,
      description: 'Modelar o blueprint do control plane de ativação produtiva. Não executar ativação real. Não conceder autorização real.'
    };
  }
}
