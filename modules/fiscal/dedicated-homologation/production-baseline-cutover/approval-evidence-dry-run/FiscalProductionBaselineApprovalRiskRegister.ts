export class FiscalProductionBaselineApprovalRiskRegister {
  public static getRisks() {
    return [
      'R-PBA-01: Risco de approval package dry-run ser interpretado como aprovação real de cutover.',
      'R-PBA-02: Risco de evidence governance plan ser confundido com evidência produtiva persistida.',
      'R-PBA-03: Risco de approval matrix ser usada por automação externa como autorização real.',
      'R-PBA-04: Risco de hard lock evidence review ser entendido como gate destravado.',
      'R-PBA-05: Risco de legacy continuity review ocultar que V2 segue bloqueada.',
      'R-PBA-06: Risco de V2 locked evidence review ser lido como ativação pendente imediata.',
      'R-PBA-07: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PBA-08: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
