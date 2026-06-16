export class FiscalProductionDatabaseCredentialNoReadPlan {
  public static getPlan() {
    return {
      databaseCredentialNoReadPlanGenerated: true,
      databaseUrlRead: false,
      connectionStringRead: false,
      databasePasswordRead: false,
      realSecretRead: false,
      description: 'Bloquear leitura de connection string, DATABASE_URL, usuário, senha, token e secret.'
    };
  }
}
