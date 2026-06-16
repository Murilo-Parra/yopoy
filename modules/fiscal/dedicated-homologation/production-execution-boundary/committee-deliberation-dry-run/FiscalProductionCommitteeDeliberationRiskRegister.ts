export class FiscalProductionCommitteeDeliberationRiskRegister {
  public static getRisks() {
    return [
      'R-PCD-01: Risco de deliberação dry-run ser interpretada como aprovação real de comitê.',
      'R-PCD-02: Risco de vote simulation ser confundida com voto real.',
      'R-PCD-03: Risco de policy evidence recording ser interpretado como trilha legal definitiva.',
      'R-PCD-04: Risco de Go/No-Go matrix ser tratada como autorização final.',
      'R-PCD-05: Risco de deliberation trail in-memory ser consumida por automações externas.',
      'R-PCD-06: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PCD-07: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
