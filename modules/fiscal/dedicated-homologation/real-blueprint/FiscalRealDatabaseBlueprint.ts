export class FiscalRealDatabaseBlueprint {
  public static getBlueprint() {
    return {
      logicalDatabaseName: 'fiscal_homologation_db',
      mandatoryRls: true,
      plannedBackupPolicy: 'Diário, retido por 7 dias',
      plannedRetentionPolicy: '30 dias para homologação',
      futureMigrationPolicy: 'Flyway ou Drizzle - isolado',
      databaseProvisioned: false,
      realDatabaseConnected: false,
      dmlExecuted: false
    };
  }
}
