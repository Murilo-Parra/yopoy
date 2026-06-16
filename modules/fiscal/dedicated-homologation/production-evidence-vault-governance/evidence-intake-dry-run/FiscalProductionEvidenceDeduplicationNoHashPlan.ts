export class FiscalProductionEvidenceDeduplicationNoHashPlan {
  public static getPlan() {
    return {
      deduplicationNoHashPlanGenerated: true,
      realCryptoUsed: false,
      realPayloadHashed: false,
      description: 'Modelar deduplicação sem hash real.'
    };
  }
}
