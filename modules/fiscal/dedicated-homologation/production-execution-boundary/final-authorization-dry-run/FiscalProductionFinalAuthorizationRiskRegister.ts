export class FiscalProductionFinalAuthorizationRiskRegister {
  public static getRisks() {
    return [
      'R-PFA-01: Risco de final authorization package ser interpretado como autorização real.',
      'R-PFA-02: Risco de non-executable authorization envelope ser tratado como documento executável.',
      'R-PFA-03: Risco de locked gate handoff ser confundido com gate destravado.',
      'R-PFA-04: Risco de decision package ser usado por automações externas como permissão real.',
      'R-PFA-05: Risco de SoD final check ser interpretado como aprovação legal definitiva.',
      'R-PFA-06: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PFA-07: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
