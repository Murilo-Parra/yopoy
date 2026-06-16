export class FiscalCanaryRollbackPlanService {
  public async getRollbackPlan(companyId?: string) {
    return {
      simulationOnly: true,
      activationBlocked: true,
      plan: [
        "Desativar future flag de canary.",
        "Retornar 100% do tráfego ao legado.",
        "Pausar V2 candidate route.",
        "Validar inexistência de SEFAZ V2 em andamento.",
        "Validar ausência de XML pendente na V2.",
        "Validar logs de divergência.",
        "Auditar respostas dos clientes afetados.",
        "Emitir relatório pós-rollback."
      ]
    };
  }
}
