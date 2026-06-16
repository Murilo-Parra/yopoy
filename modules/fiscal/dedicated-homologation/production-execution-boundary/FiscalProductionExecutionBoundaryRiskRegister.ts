export class FiscalProductionExecutionBoundaryRiskRegister {
  public static getRisks() {
    return [
      'R-PEB-01: Risco de execution boundary ser interpretado como autorização real.',
      'R-PEB-02: Risco de no-op activation gate ser confundido com gate destravado.',
      'R-PEB-03: Risco de authorization contract ser usado por automações externas como permissão real.',
      'R-PEB-04: Risco de eligibility matrix ser tratada como autorização final.',
      'R-PEB-05: Risco de no-side-effect evidence ser confundido com prova de produção pronta.',
      'R-PEB-06: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PEB-07: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
