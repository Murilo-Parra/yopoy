export class FiscalRouteTransitionRiskRegister {
  public static getRisks() {
    return [
      'R-RTB-01: Risco de blueprint de transição ser interpretado como alteração real de rotas.',
      'R-RTB-02: Risco de inventário V2 ser confundido com readiness operacional.',
      'R-RTB-03: Risco de contrato de preservação ser tratado como fallback instalado.',
      'R-RTB-04: Risco de routeToV2 ser ativado por flag externa.',
      'R-RTB-05: Risco de app.use ser alterado fora do gate.',
      'R-RTB-06: Risco de UI administrativa ocultar estado simulation-only.'
    ];
  }
}
