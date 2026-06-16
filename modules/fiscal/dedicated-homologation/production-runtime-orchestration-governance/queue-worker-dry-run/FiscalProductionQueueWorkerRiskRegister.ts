export class FiscalProductionQueueWorkerRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PQW-01: Risco de topologia de queue parecer fila produtiva iniciada.',
      'R-PQW-02: Risco de worker dispatch no-op parecer worker real despachado.',
      'R-PQW-03: Risco de job enqueue matrix parecer job realmente enfileirado.',
      'R-PQW-04: Risco de batch/micro-batch no-execute parecer processamento ativo.',
      'R-PQW-05: Risco de retry/backoff no-activation parecer mecanismo real de retry.',
      'R-PQW-06: Risco de DLQ no-create parecer dead-letter queue real provisionada.',
      'R-PQW-07: Risco de consumer/producer no-start parecer conectores ativos.',
      'R-PQW-08: Risco de concurrency pool no-open parecer pool produtivo ativo.',
      'R-PQW-09: Risco de job payload no-read parecer leitura sanitizada real.',
      'R-PQW-10: Risco de UI ocultar activationBlocked=true e simulationOnly=true.',
      'R-PQW-11: Risco de automação externa ignorar approvedForRealQueueStart=false.',
      'R-PQW-12: Risco de testes temporários permanecerem no repositório.',
      'R-PQW-13: Risco de namespace/export colidir com domínios anteriores.',
      'R-PQW-14: Risco de diretoria interpretar queue topology como operação produtiva liberada.'
    ];
  }
}
