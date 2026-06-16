export class FiscalProductionActivationCommandRehearsalBlueprint {
  public static getBlueprint() {
    return {
      activationCommandRehearsalBlueprintGenerated: true,
      realActivationCommandExecuted: false,
      realGoLiveExecuted: false,
      description: 'Modelar rehearsal documental de comando de ativação. Não executar comando real. Não aprovar go-live real.'
    };
  }
}
