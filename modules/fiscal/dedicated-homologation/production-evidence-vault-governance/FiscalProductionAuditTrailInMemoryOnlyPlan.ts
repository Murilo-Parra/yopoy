export class FiscalProductionAuditTrailInMemoryOnlyPlan {
  public static getPlan() {
    return {
      auditTrailInMemoryOnlyPlanGenerated: true,
      realAuditRecordPersisted: false,
      description: 'Modelar trilha de auditoria exclusivamente in-memory. Não persistir registros reais.'
    };
  }
}
