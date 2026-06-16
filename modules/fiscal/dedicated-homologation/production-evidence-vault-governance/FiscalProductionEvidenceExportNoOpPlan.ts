export class FiscalProductionEvidenceExportNoOpPlan {
  public static getPlan() {
    return {
      evidenceExportNoOpPlanGenerated: true,
      realEvidenceExported: false,
      externalStorageUploaded: false,
      description: 'Modelar exportação no-op. Não exportar evidência real. Não enviar storage externo.'
    };
  }
}
