export class FiscalProductionSupportHandoverNoConclusionPlan {
  public static getPlan() {
    return {
      supportHandoverNoConclusionPlanGenerated: true,
      realSupportHandoverConcluded: false,
      realAuthorizationGranted: false,
      description: 'Modelar handover de suporte sem conclusão real. Não concluir handover operacional. Não conceder autorização.'
    };
  }
}
