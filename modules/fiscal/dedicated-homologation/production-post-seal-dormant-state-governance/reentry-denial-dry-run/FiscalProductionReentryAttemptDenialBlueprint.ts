export class FiscalProductionReentryAttemptDenialBlueprint {
  public static getBlueprint() {
    return {
      reentryAttemptDenialBlueprintGenerated: true,
      realReentryAttemptCreated: false,
      description: 'Modelar tentativa de reentrada apenas de forma documental e negar criação de reentrada operacional real.'
    };
  }
}
