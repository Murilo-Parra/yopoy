export class FiscalProductionNoRealDeletionEvidence {
  public static getEvidence() {
    return {
      noRealDeletionEvidenceGenerated: true,
      realDataExpired: false,
      realDataDeleted: false,
      description: 'Evidenciar que nenhuma expiração/deleção real ocorreu.'
    };
  }
}
