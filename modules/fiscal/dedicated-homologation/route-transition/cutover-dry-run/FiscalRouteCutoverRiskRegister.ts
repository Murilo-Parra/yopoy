export class FiscalRouteCutoverRiskRegister {
  public static getRisks() {
    return [
      'R-RCD-01: Risco de cutover dry-run ser interpretado como cutover real.',
      'R-RCD-02: Risco de fallback governance ser confundido com fallback instalado.',
      'R-RCD-03: Risco de shadow rollback plan ser tratado como rollback operacional.',
      'R-RCD-04: Risco de abort criteria ser entendido como automação real de abort.',
      'R-RCD-05: Risco de decision matrix ser usada como aprovação de routeToV2.',
      'R-RCD-06: Risco de UI administrativa ocultar o estado simulation-only.'
    ];
  }
}
