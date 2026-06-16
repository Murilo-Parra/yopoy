export class FiscalProductionRetentionCustodyAttestationBlueprint {
  public static getBlueprint() {
    return {
      custodyAttestationBlueprintGenerated: true,
      realCustodyAttestationCreated: false,
      realRetentionAttestationCreated: false,
      description: 'Modelar atestado virtual de custódia e retenção. Não criar atestado real.'
    };
  }
}
