export class FiscalProductionDatabaseConnectionNoOpenBlueprint {
  public static getBlueprint() {
    return {
      databaseConnectionNoOpenBlueprintGenerated: true,
      realDatabaseConnected: false,
      connectionStringRead: false,
      description: 'Modelar conexão futura de banco como documentação. Não conectar banco real. Não ler DATABASE_URL ou connection string real.'
    };
  }
}
