export class FiscalProductionPayloadDuplicationNoOpPlan {
  public static getPlan() {
    return {
      payloadDuplicationNoOpPlanGenerated: true,
      realRequestDuplicated: false,
      realTrafficMirrored: false,
      description: 'Modelar duplicação de payload como no-op. Não duplicar request real. Não espelhar tráfego real.'
    };
  }
}
