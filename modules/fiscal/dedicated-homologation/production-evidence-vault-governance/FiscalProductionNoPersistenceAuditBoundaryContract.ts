export class FiscalProductionNoPersistenceAuditBoundaryContract {
  public static getContract() {
    return {
      noPersistenceAuditBoundaryContractGenerated: true,
      realAuditRecordPersisted: false,
      fileSystemWritten: false,
      databaseWritten: false,
      description: 'Declarar fronteira de auditoria sem persistência real. Impedir gravação em banco, filesystem ou storage externo.'
    };
  }
}
