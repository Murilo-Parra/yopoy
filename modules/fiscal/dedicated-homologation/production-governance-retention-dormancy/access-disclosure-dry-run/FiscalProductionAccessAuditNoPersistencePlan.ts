export class FiscalProductionAccessAuditNoPersistencePlan {
  public static getPlan() {
    return {
      accessAuditNoPersistencePlanGenerated: true,
      realAccessAuditPersisted: false,
      realDatabaseWritten: false,
      description: 'Impedir persistência de audit record real de acesso.'
    };
  }
}
