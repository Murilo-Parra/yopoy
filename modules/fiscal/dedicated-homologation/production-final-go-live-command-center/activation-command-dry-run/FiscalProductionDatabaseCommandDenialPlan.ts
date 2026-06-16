export class FiscalProductionDatabaseCommandDenialPlan {
  public static getPlan() {
    return {
      databaseCommandDenialPlanGenerated: true,
      realDatabaseConnected: false,
      dmlExecuted: false,
      ddlExecuted: false,
      description: 'Negar banco, pool, transação, query, DML, DDL, migration e repository write.'
    };
  }
}
