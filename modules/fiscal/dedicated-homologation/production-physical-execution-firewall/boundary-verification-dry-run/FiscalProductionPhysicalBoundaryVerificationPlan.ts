export class FiscalProductionPhysicalBoundaryVerificationPlan {
  public static getPlan() {
    return {
      physicalBoundaryVerificationPlanGenerated: true,
      realInfrastructureScannerExecuted: false,
      activationBlocked: true,
      description: 'Modelar verificação documental do boundary físico. Não executar scanner real. Não inspecionar infraestrutura real.'
    };
  }
}
