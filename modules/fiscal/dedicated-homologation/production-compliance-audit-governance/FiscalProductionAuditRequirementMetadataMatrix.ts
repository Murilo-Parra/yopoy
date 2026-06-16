export class FiscalProductionAuditRequirementMetadataMatrix {
  public static getMatrix() {
    return {
      auditRequirementMetadataMatrixGenerated: true,
      realAuditRecordPersisted: false,
      description: 'Mapear requisitos de auditoria apenas por metadados. Não persistir requisito legal real.'
    };
  }
}
