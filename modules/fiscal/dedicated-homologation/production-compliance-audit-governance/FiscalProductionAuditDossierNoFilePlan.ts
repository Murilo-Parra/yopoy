export class FiscalProductionAuditDossierNoFilePlan {
  public static getPlan() {
    return {
      auditDossierNoFilePlanGenerated: true,
      realAuditDossierCreated: false,
      realAuditFileGenerated: false,
      description: 'Modelar dossiê de auditoria sem criar arquivo real. Não gerar ZIP, PDF, JSON assinado ou pacote real.'
    };
  }
}
