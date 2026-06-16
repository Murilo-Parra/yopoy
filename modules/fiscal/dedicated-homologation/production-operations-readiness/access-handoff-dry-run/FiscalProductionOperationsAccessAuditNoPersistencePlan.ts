export class FiscalProductionOperationsAccessAuditNoPersistencePlan {
  public static getPlan() {
    return {
      accessAuditNoPersistencePlanGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      description: 'Modelar auditoria de acesso sem persistência real. Não gravar payload bruto. Não gravar dados sensíveis.'
    };
  }
}
