export class FiscalProductionRuntimeFinalRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PROC-01: Risco de closure documental parecer encerramento operacional real.',
      'R-PROC-02: Risco de no-execution handoff parecer autorização para execução.',
      'R-PROC-03: Risco de evidence package parecer pacote executável publicado.',
      'R-PROC-04: Risco de runtime blueprint parecer runtime iniciado.',
      'R-PROC-05: Risco de database persistence no-write parecer banco validado em produção.',
      'R-PROC-06: Risco de external integration no-call parecer SEFAZ/API externa validada.',
      'R-PROC-07: Risco de token no-issue parecer autorização emitida.',
      'R-PROC-08: Risco de UI ocultar activationBlocked=true e simulationOnly=true.',
      'R-PROC-09: Risco de automação externa ignorar approvedForRealRuntimeExecution=false.',
      'R-PROC-10: Risco de lint global falho ser confundido com falha do 40.6.',
      'R-PROC-11: Risco de TS2308 preexistente bloquear CI rígido posterior.',
      'R-PROC-12: Risco de testes temporários permanecerem no repositório.',
      'R-PROC-13: Risco de namespace/export colidir com domínios anteriores.',
      'R-PROC-14: Risco de diretoria interpretar closure do Domínio 40 como liberação produtiva.'
    ];
  }
}
