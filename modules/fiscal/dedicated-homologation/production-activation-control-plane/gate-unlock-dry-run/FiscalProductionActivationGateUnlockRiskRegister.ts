export class FiscalProductionActivationGateUnlockRiskRegister {
  public static getRisks() {
    return [
      'R-PAGU-01: Risco de gate unlock simulation ser interpretada como unlock real.',
      'R-PAGU-02: Risco de authorization token no-issue plan ser confundido com emissão oficial de token.',
      'R-PAGU-03: Risco de authorization grant no-op ser lido como autorização real.',
      'R-PAGU-04: Risco de V2 activation block matrix ser usada por automação como readiness produtiva.',
      'R-PAGU-05: Risco de dependency matrix ser confundida com aprovação executável.',
      'R-PAGU-06: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PAGU-07: Risco de testes temporários permanecerem no repositório com prefixo temp.',
      'R-PAGU-08: Risco de harness Supertest reutilizar server/socket compartilhado e gerar falso negativo com .address().'
    ];
  }
}
