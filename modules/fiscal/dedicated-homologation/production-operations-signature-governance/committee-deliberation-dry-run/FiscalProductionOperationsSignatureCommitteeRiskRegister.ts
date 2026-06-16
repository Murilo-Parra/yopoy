export class FiscalProductionOperationsSignatureCommitteeRiskRegister {
  public static getRisks() {
    return [
      'R-POSC-01: Risco de committee deliberation ser interpretada como aprovação real.',
      'R-POSC-02: Risco de quorum simulation ser confundida com quórum oficial.',
      'R-POSC-03: Risco de consent decision no-op matrix ser lida como autorização real.',
      'R-POSC-04: Risco de final recommendation ser usada por automação externa como gatilho de gate unlock.',
      'R-POSC-05: Risco de risk acceptance no-op review ser confundida com aceite real de risco.',
      'R-POSC-06: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-POSC-07: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
