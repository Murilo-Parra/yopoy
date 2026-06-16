export class FiscalProductionOperationsAccessHandoffBlueprint {
  public static getBlueprint() {
    return {
      accessHandoffBlueprintGenerated: true,
      realOperationsAccessGranted: false,
      activationBlocked: true,
      description: 'Modelar o handoff de acesso operacional como dry-run. Não conceder acesso real.'
    };
  }
}
