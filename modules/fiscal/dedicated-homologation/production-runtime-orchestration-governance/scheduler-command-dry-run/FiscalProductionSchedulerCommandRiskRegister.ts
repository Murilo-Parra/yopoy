export class FiscalProductionSchedulerCommandRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PSC-01: Risco de scheduler no-create parecer scheduler produtivo criado.',
      'R-PSC-02: Risco de cron no-create parecer cron ativo.',
      'R-PSC-03: Risco de command runner no-execute parecer shell autorizado.',
      'R-PSC-04: Risco de process manager no-create parecer processo produtivo ativo.',
      'R-PSC-05: Risco de lifecycle runner no-create parecer lifecycle hook executado.',
      'R-PSC-06: Risco de task runner no-execute parecer task real concluída.',
      'R-PSC-07: Risco de recurring task no-register parecer agendamento real.',
      'R-PSC-08: Risco de timeout guard no-activation parecer proteção real ativa.',
      'R-PSC-09: Risco de no-real-execution evidence parecer teste físico bem-sucedido.',
      'R-PSC-10: Risco de UI ocultar activationBlocked=true e simulationOnly=true.',
      'R-PSC-11: Risco de automação externa ignorar approvedForRealCommandExecution=false.',
      'R-PSC-12: Risco de testes temporários permanecerem no repositório.',
      'R-PSC-13: Risco de namespace/export colidir com domínios anteriores.',
      'R-PSC-14: Risco de diretoria interpretar scheduler blueprint como operação produtiva liberada.'
    ];
  }
}
