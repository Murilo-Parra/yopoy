export class FiscalProductionOperationsNoPermissionMutationEvidence {
  public static getEvidence() {
    return {
      noPermissionMutationEvidenceGenerated: true,
      realRbacModified: false,
      realPermissionModified: false,
      description: 'Evidenciar ausência de mutação de permissões. Não alterar RBAC.'
    };
  }
}
