export class FiscalProductionRolloutApprovalRiskRegister {
  public static getRisks() {
    return [
      'R-PRA-01: Risco de rollout approval matrix ser interpretada como rollout aprovado.',
      'R-PRA-02: Risco de final release verification no-op ser confundida com release ativa.',
      'R-PRA-03: Risco de canary rollout no-op ser tratado como canary real.',
      'R-PRA-04: Risco de rollout percentage matrix ser convertido em configuração ativa por automação externa.',
      'R-PRA-05: Risco de go-live verification evidence ser lida como go-live real.',
      'R-PRA-06: Risco de no-traffic-promotion evidence ser usada como permissão operacional.',
      'R-PRA-07: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PRA-08: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
