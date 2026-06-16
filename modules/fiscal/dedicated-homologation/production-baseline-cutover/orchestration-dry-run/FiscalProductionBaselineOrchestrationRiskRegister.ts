export class FiscalProductionBaselineOrchestrationRiskRegister {
  public static getRisks() {
    return [
      'R-PBO-01: Risco de cutover orchestration no-op ser interpretado como orquestração real.',
      'R-PBO-02: Risco de endpoint rollout no-op ser confundido com rollout real.',
      'R-PBO-03: Risco de route promotion no-op ser usado por automação externa como routeToV2.',
      'R-PBO-04: Risco de traffic slice simulation ser lida como canary real.',
      'R-PBO-05: Risco de endpoint readiness evidence ser confundida com chamada real de endpoint.',
      'R-PBO-06: Risco de operational sequence no-op sugerir runtime ativado.',
      'R-PBO-07: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PBO-08: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
