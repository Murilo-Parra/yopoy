export class FiscalProductionEvidenceVaultBlueprint {
  public static getBlueprint() {
    return {
      vaultBlueprintGenerated: true,
      realEvidenceVaultCreated: false,
      description: 'Modelar o blueprint documental do cofre de evidências. Não criar vault real. Não gravar storage real.'
    };
  }
}
