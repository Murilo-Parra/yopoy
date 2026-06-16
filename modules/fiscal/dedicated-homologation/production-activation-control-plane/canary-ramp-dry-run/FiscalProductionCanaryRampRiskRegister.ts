export class FiscalProductionCanaryRampRiskRegister {
  public static getRisks() {
    return [
      'R-PACR-01: Risco de canary ramp simulation ser interpretada como canary real.',
      'R-PACR-02: Risco de traffic promotion no-op ser confundido com promoção produtiva.',
      'R-PACR-03: Risco de traffic slice simulation matrix ser usada por automação como config de roteamento real.',
      'R-PACR-04: Risco de reversible promotion plan ser lido como rollback operacional.',
      'R-PACR-05: Risco de dependency matrix ser confundida com autorização executável.',
      'R-PACR-06: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PACR-07: Risco de testes temporários permanecerem no repositório com prefixo temp.',
      'R-PACR-08: Risco de harness Supertest reutilizar server/socket compartilhado e gerar falso negativo com .address().'
    ];
  }
}
