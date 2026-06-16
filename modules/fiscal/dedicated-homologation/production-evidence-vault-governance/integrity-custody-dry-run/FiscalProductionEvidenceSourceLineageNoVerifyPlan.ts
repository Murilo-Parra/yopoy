export class FiscalProductionEvidenceSourceLineageNoVerifyPlan {
  public static getPlan() {
    return {
      sourceLineageNoVerifyPlanGenerated: true,
      realSourceAuthenticityVerified: false,
      description: 'Modelar lineage de origem sem verificação externa real. Não consultar fonte externa.'
    };
  }
}
