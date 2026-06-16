export class FiscalProductionEvidenceExternalAuditExportNoOpPlan {
  public static getPlan() {
    return {
      externalAuditExportNoOpPlanGenerated: true,
      realEvidenceExported: false,
      externalStorageUploaded: false,
      description: 'Modelar exportação para auditoria externa como no-op. Não exportar evidência real. Não enviar storage externo.'
    };
  }
}
