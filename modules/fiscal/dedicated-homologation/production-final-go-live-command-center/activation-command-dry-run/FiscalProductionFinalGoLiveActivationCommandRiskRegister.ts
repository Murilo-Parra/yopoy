export class FiscalProductionFinalGoLiveActivationCommandRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PFGAC-01: Risco de rehearsal de comando parecer comando real de ativação.',
      'R-PFGAC-02: Risco de activation command envelope parecer payload executável.',
      'R-PFGAC-03: Risco de execution denial ser confundido com autorização parcial.',
      'R-PFGAC-04: Risco de gate unlock denial ser ignorado por UI ou automação.',
      'R-PFGAC-05: Risco de token issue denial parecer token emitido com sucesso.',
      'R-PFGAC-06: Risco de routeToV2 command denial parecer teste real de roteamento.',
      'R-PFGAC-07: Risco de runtime command denial parecer runtime pré-aquecido.',
      'R-PFGAC-08: Risco de database command denial parecer banco validado em produção.',
      'R-PFGAC-09: Risco de external integration command denial parecer SEFAZ/API externa validada.',
      'R-PFGAC-10: Risco de UI ocultar activationBlocked=true e simulationOnly=true.',
      'R-PFGAC-11: Risco de automação externa ignorar approvedForRealActivationCommand=false.',
      'R-PFGAC-12: Risco de lint global falho ser confundido com falha do 41.3.',
      'R-PFGAC-13: Risco de TS2308 preexistente bloquear CI rígido posterior.',
      'R-PFGAC-14: Risco de testes temporários permanecerem no repositório.',
      'R-PFGAC-15: Risco de diretoria interpretar rehearsal como autorização operacional.'
    ];
  }
}
