export class FiscalProductionActivationControlPlaneRiskRegister {
  public static getRisks() {
    return [
      'R-PACP-01: Risco de control plane blueprint ser interpretado como plano executável de ativação.',
      'R-PACP-02: Risco de physical execution prohibition contract ser ignorado por automação externa.',
      'R-PACP-03: Risco de authorization no-op matrix ser lida como autorização real.',
      'R-PACP-04: Risco de activation precondition matrix ser usada como gatilho de Produção V2.',
      'R-PACP-05: Risco de dependency inventory ser confundido com readiness executável.',
      'R-PACP-06: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PACP-07: Risco de testes temporários permanecerem no repositório com prefixo temp.',
      'R-PACP-08: Risco de harness Supertest reutilizar server/socket compartilhado e gerar falso negativo com .address().'
    ];
  }
}
