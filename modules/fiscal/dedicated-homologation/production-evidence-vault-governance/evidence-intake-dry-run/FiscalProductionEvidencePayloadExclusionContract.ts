export class FiscalProductionEvidencePayloadExclusionContract {
  public static getContract() {
    return {
      payloadExclusionContractGenerated: true,
      realPayloadRead: false,
      payloadIncluded: false,
      description: 'Garantir exclusão de payload real.'
    };
  }
}
