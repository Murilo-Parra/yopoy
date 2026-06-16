export class FiscalProductionOperationsTransitionRiskRegister {
  public static getRisks() {
    return [
      'R-POT-01: Risco de blueprint de control plane ser interpretado como transição real.',
      'R-POT-02: Risco de consent boundary ser confundido com autorização real.',
      'R-POT-03: Risco de readiness não executável ser interpretado como liberação para go-live.',
      'R-POT-04: Risco de matriz de autoridade ser usada por automação externa como permissão real.',
      'R-POT-05: Risco de checklist de pré-condições ser confundido com aprovação de tráfego.',
      'R-POT-06: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-POT-07: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
