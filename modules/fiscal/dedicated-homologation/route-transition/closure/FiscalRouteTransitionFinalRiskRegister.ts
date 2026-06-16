export class FiscalRouteTransitionFinalRiskRegister {
  public static getRisks() {
    return [
      'R-RTC-01: Risco de closure ser interpretado como autorização de transição real.',
      'R-RTC-02: Risco de production handoff dry-run ser confundido com go-live de rotas.',
      'R-RTC-03: Risco de evidence package ser tratado como validação produtiva definitiva.',
      'R-RTC-04: Risco de roadmap pós-closure ser usado para ativar routeToV2 fora de novo gate.',
      'R-RTC-05: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-RTC-06: Risco de stakeholders confundirem preservação do legado com fallback real instalado.'
    ];
  }
}
