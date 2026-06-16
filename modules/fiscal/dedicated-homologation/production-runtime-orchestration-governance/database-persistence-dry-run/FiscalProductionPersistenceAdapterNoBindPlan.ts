export class FiscalProductionPersistenceAdapterNoBindPlan {
  public static getPlan() {
    return {
      persistenceAdapterNoBindPlanGenerated: true,
      realDatabaseConnected: false,
      description: 'Modelar adapters Prisma/TypeORM/JDBC/ORM como no-bind. Não vincular adapter real.'
    };
  }
}
