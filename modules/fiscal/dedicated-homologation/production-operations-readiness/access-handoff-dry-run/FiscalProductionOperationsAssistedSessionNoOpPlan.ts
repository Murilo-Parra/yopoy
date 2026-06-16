export class FiscalProductionOperationsAssistedSessionNoOpPlan {
  public static getPlan() {
    return {
      assistedSessionNoOpPlanGenerated: true,
      realAssistedSessionOpened: false,
      realTenantDataRead: false,
      description: 'Modelar sessão assistida como no-op. Não abrir sessão real.'
    };
  }
}
