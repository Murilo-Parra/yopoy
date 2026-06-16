export class FiscalProductionEvidenceIntakeBlueprint {
  public static getBlueprint() {
    return {
      intakeBlueprintGenerated: true,
      realEvidencePersisted: false,
      description: 'Modelar intake documental de evidências. Não aceitar payload bruto. Não persistir evidência real.'
    };
  }
}
