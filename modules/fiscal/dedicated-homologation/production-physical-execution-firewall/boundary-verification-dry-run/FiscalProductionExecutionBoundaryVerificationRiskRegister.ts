export class FiscalProductionExecutionBoundaryVerificationRiskRegister {
  public static getRisks() {
    return [
      'R-PEBV-01: Risco de boundary verification dry-run ser interpretada como scanner real.',
      'R-PEBV-02: Risco de runtime interlock drift simulation ser usada como health-check produtivo.',
      'R-PEBV-03: Risco de queue/worker drift matrix ser confundida com inspeção real de filas.',
      'R-PEBV-04: Risco de database transaction drift matrix ser confundida com validação real de banco.',
      'R-PEBV-05: Risco de traffic route drift matrix ser usada como configuração real de roteamento.',
      'R-PEBV-06: Risco de authorization gate drift matrix ser lida como status real de autorização.',
      'R-PEBV-07: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PEBV-08: Risco de testes temporários permanecerem no repositório.',
      'R-PEBV-09: Risco de namespace/export colidir com Domain 32, 33 ou 34.1 em barrels globais.',
      'R-PEBV-10: Risco de harness Supertest reutilizar server/socket compartilhado e gerar falso negativo .address().'
    ];
  }
}
