export class FiscalProductionOperationsReadinessRiskRegister {
  public static getRisks() {
    return [
      'R-POR-01: Risco de readiness blueprint ser interpretado como transição operacional real.',
      'R-POR-02: Risco de hard no-execution contract ser lido como gate destravado.',
      'R-POR-03: Risco de responsibility inventory ser confundido com concessão real de papéis.',
      'R-POR-04: Risco de transition no-activation plan ser usado por automação externa como sinal de operação ativa.',
      'R-POR-05: Risco de legacy continuity plan ocultar que V2 segue bloqueada.',
      'R-POR-06: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-POR-07: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
