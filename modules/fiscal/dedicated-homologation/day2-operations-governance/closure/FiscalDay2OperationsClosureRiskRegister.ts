export class FiscalDay2OperationsClosureRiskRegister {
  public static getRisks() {
    return [
      'R-D2OC-01: Risco de sign-off de closure ser interpretado como go-live real.',
      'R-D2OC-02: Risco de handoff no-op ser confundido com delegação operacional real de suporte.',
      'R-D2OC-03: Risco de dashboards mockados constarem como monitoria efetiva.'
    ];
  }
}
