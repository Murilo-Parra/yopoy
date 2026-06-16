export class FiscalProductionExecutionFirewallApprovalRiskRegister {
  public static getRisks() {
    return [
      'R-PEFA-01: Risco de approval package ser interpretado como aprovação executiva real.',
      'R-PEFA-02: Risco de executive sign-off simulation ser tratado como assinatura formal.',
      'R-PEFA-03: Risco de approver eligibility matrix ser usada como RBAC real.',
      'R-PEFA-04: Risco de authorization block matrix ser lida como status real de autorização.',
      'R-PEFA-05: Risco de boundary drift review matrix ser confundida com scanner real.',
      'R-PEFA-06: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PEFA-07: Risco de testes temporários permanecerem no repositório.',
      'R-PEFA-08: Risco de namespace/export colidir com Domain 32, 33, 34.1 ou 34.2 em barrels globais.',
      'R-PEFA-09: Risco de harness Supertest reutilizar server/socket compartilhado e gerar falso negativo .address().',
      'R-PEFA-10: Risco de aprovação simulada ser usada por automação externa como sinal de GO produtivo.'
    ];
  }
}
