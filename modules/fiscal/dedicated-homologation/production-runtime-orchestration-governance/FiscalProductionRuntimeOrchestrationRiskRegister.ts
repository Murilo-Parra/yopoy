export class FiscalProductionRuntimeOrchestrationRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PROG-01: Risco de blueprint de runtime parecer execução real.',
      'R-PROG-02: Risco de queue/worker no-start parecer fila produtiva pronta.',
      'R-PROG-03: Risco de job dispatch no-op parecer job realmente enfileirado.',
      'R-PROG-04: Risco de scheduler/cron no-create parecer agendamento real.',
      'R-PROG-05: Risco de command runner no-execute parecer shell autorizado.',
      'R-PROG-06: Risco de lifecycle runner no-op parecer process manager ativo.',
      'R-PROG-07: Risco de transaction no-open parecer transação real segura.',
      'R-PROG-08: Risco de external integration no-call parecer SEFAZ validada.',
      'R-PROG-09: Risco de data boundary no-read parecer leitura sanitizada real.',
      'R-PROG-10: Risco de UI ocultar activationBlocked=true e simulationOnly=true.',
      'R-PROG-11: Risco de automação externa ignorar approvedForRealRuntimeExecution=false.',
      'R-PROG-12: Risco de testes temporários permanecerem no repositório.',
      'R-PROG-13: Risco de namespace/export colidir com domínios anteriores.',
      'R-PROG-14: Risco de diretoria interpretar runtime blueprint como operação produtiva liberada.'
    ];
  }
}
