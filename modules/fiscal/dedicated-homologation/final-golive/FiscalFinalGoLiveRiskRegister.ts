export class FiscalFinalGoLiveRiskRegister {
  public static getRisks() {
    return [
      'R-FGL-01: Risco de blueprint final ser interpretado como autorização de produção.',
      'R-FGL-02: Risco de contrato zero-execution ser confundido com plano executável.',
      'R-FGL-03: Risco de readiness checklist ser tratado como go-live real.',
      'R-FGL-04: Risco de dependências legais simuladas serem confundidas com assinatura real.',
      'R-FGL-05: Risco de rota V2 ser ativada por flag externa.',
      'R-FGL-06: Risco de UI administrativa ocultar o estado simulation-only.'
    ];
  }
}
