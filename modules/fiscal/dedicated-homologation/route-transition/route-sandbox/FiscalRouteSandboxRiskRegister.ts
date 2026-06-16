export class FiscalRouteSandboxRiskRegister {
  public static getRisks() {
    return [
      'R-RSB-01: Risco de sandbox blueprint ser interpretado como sandbox real criado.',
      'R-RSB-02: Risco de walled garden plan ser confundido com rede isolada real.',
      'R-RSB-03: Risco de data boundary plan ser tratado como proteção técnica ativa.',
      'R-RSB-04: Risco de synthetic-only contract ser confundido com ambiente operacional.',
      'R-RSB-05: Risco de no-runtime evidence ser confundida com observabilidade real.',
      'R-RSB-06: Risco de UI administrativa ocultar o estado simulation-only.'
    ];
  }
}
