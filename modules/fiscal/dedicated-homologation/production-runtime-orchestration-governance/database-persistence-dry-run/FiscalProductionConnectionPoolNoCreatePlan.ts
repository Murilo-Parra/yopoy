export class FiscalProductionConnectionPoolNoCreatePlan {
  public static getPlan() {
    return {
      connectionPoolNoCreatePlanGenerated: true,
      realConnectionPoolCreated: false,
      description: 'Modelar connection pool sem criação real. Não abrir pool real.'
    };
  }
}
