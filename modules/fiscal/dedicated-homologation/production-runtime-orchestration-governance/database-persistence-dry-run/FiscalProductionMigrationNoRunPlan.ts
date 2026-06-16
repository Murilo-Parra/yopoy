export class FiscalProductionMigrationNoRunPlan {
  public static getPlan() {
    return {
      migrationNoRunPlanGenerated: true,
      realMigrationRun: false,
      realSchemaCreated: false,
      realTableAltered: false,
      description: 'Modelar migrations sem execução real. Não criar schema nem alterar tabela.'
    };
  }
}
