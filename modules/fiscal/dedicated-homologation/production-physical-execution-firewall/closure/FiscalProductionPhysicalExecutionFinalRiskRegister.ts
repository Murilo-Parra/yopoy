export class FiscalProductionPhysicalExecutionFinalRiskRegister {
  public static getRisks() {
    return [
      'R-PPEFC-01: Risco de closure final ser interpretado como autorização de execução física.',
      'R-PPEFC-02: Risco de evidence package ser confundido com evidência de produção ativada.',
      'R-PPEFC-03: Risco de no-activation handoff ser tratado como handoff operacional real.',
      'R-PPEFC-04: Risco de roadmap pós-closure induzir módulos seguintes a assumirem estado executável.',
      'R-PPEFC-05: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PPEFC-06: Risco de testes temporários permanecerem no repositório.',
      'R-PPEFC-07: Risco de namespace/export colidir com Domain 32, 33, 34.1, 34.2, 34.3 ou 34.4.',
      'R-PPEFC-08: Risco de harness Supertest reutilizar server/socket compartilhado e gerar falso negativo .address().',
      'R-PPEFC-09: Risco de automação externa ler o closure como sinal de GO produtivo.',
      'R-PPEFC-10: Risco de o renome anterior do 34.4 não ser refletido corretamente no barrel export.'
    ];
  }
}
