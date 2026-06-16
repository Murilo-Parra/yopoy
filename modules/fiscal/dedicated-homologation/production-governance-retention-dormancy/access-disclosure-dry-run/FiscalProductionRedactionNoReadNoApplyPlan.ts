export class FiscalProductionRedactionNoReadNoApplyPlan {
  public static getPlan() {
    return {
      redactionNoReadNoApplyPlanGenerated: true,
      realRedactionApplied: false,
      realPayloadRead: false,
      description: 'Impedir leitura real e aplicação real de redaction.'
    };
  }
}
