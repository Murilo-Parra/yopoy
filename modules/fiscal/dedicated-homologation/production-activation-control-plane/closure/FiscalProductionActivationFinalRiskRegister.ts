export class FiscalProductionActivationFinalRiskRegister {
  public static getRisks() {
    return [
      'R-PACF-01: Risco de closure ser interpretado como ativação real concluída.',
      'R-PACF-02: Risco de evidence package ser usado por automação externa como sinal de GO produtivo.',
      'R-PACF-03: Risco de no-activation handoff ser confundido com handoff operacional real.',
      'R-PACF-04: Risco de dashboard ocultar flags simulation-only.',
      'R-PACF-05: Risco de roadmap pós-closure ser interpretado como plano executável.',
      'R-PACF-06: Risco de testes temporários permanecerem no repositório.',
      'R-PACF-07: Risco de Supertest reutilizar server/socket compartilhado e gerar falso negativo .address().',
      'R-PACF-08: Risco de integrações futuras ignorarem activationBlocked: true.'
    ];
  }
}
