export class FiscalProductionActivationApprovalRiskRegister {
  public static getRisks() {
    return [
      'R-PAAG-01: Risco de approval governance ser interpretada como aprovação real.',
      'R-PAAG-02: Risco de stakeholder matrix ser confundida com notificação oficial.',
      'R-PAAG-03: Risco de pre-approval matrix ser usada por automação externa como autorização real.',
      'R-PAAG-04: Risco de GO/NO-GO no-op matrix ser lida como sinal verde produtivo.',
      'R-PAAG-05: Risco de evidence review matrix ser confundida com readiness executável.',
      'R-PAAG-06: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PAAG-07: Risco de testes temporários permanecerem no repositório com prefixo temp.',
      'R-PAAG-08: Risco de harness Supertest reutilizar server/socket compartilhado e gerar falso negativo com .address().'
    ];
  }
}
