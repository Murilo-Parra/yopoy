export class FiscalProductionEvidenceRetentionNoOpPlan {
  public static getPlan() {
    return {
      evidenceRetentionNoOpPlanGenerated: true,
      realEvidencePersisted: false,
      description: 'Modelar retenção documental sem retenção real. Não persistir evidência.'
    };
  }
}
