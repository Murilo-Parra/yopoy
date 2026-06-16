export class FiscalProductionFinalGoLiveReadinessRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PFGR-01: Risco de readiness aggregation parecer aprovação real.',
      'R-PFGR-02: Risco de quorum simulation parecer deliberação executiva real.',
      'R-PFGR-03: Risco de vote simulation parecer decisão vinculante.',
      'R-PFGR-04: Risco de non-binding decision ser interpretada como autorização produtiva.',
      'R-PFGR-05: Risco de no-real-approval evidence parecer approval record real.',
      'R-PFGR-06: Risco de no-real-authority evidence ser ignorado por UI ou automação.',
      'R-PFGR-07: Risco de no-execution plan parecer runtime pré-aquecido.',
      'R-PFGR-08: Risco de no-database plan parecer banco validado em produção.',
      'R-PFGR-09: Risco de no-external-integration plan parecer SEFAZ/API externa validada.',
      'R-PFGR-10: Risco de UI ocultar activationBlocked=true e simulationOnly=true.',
      'R-PFGR-11: Risco de automação externa ignorar approvedForRealGoLiveApproval=false.',
      'R-PFGR-12: Risco de lint global falho ser confundido com falha do 41.2.',
      'R-PFGR-13: Risco de TS2308 preexistente bloquear CI rígido posterior.',
      'R-PFGR-14: Risco de testes temporários permanecerem no repositório.',
      'R-PFGR-15: Risco de diretoria interpretar quorum simulado como aprovação final.'
    ];
  }
}
