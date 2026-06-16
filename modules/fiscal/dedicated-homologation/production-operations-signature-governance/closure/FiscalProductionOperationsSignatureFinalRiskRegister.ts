export class FiscalProductionOperationsSignatureFinalRiskRegister {
  public static getRisks() {
    return [
      'R-POSGC-01: Risco de closure package ser interpretado como assinatura real final.',
      'R-POSGC-02: Risco de final no-activation evidence ser confundida com autorização produtiva.',
      'R-POSGC-03: Risco de no-activation handoff ser lido como handoff operacional real.',
      'R-POSGC-04: Risco de evidence package ser usado por automação externa como gatilho de gate unlock.',
      'R-POSGC-05: Risco de token no-issue evidence ser confundida com emissão oficial.',
      'R-POSGC-06: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-POSGC-07: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
