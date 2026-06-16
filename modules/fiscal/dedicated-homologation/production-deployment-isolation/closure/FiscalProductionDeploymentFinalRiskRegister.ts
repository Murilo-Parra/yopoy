export class FiscalProductionDeploymentFinalRiskRegister {
  public static getRisks() {
    return [
      'R-PDC-01: Risco de closure ser interpretado como autorização de produção real.',
      'R-PDC-02: Risco de evidence package ser confundido com pacote executável.',
      'R-PDC-03: Risco de final readiness review ser tratado como GO-LIVE definitivo.',
      'R-PDC-04: Risco de no-activation handoff ser ignorado por automações externas.',
      'R-PDC-05: Risco de post-closure roadmap ser usado como plano executável.',
      'R-PDC-06: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PDC-07: Risco de testes temporários serem mantidos com prefixo temp no repositório final.'
    ];
  }
}
