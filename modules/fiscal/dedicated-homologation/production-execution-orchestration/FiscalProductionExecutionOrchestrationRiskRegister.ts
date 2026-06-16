export class FiscalProductionExecutionOrchestrationRiskRegister {
  public static getRisks() {
    return [
      'R-PEO-01: Risco de orchestration blueprint ser interpretado como orquestração real.',
      'R-PEO-02: Risco de runtime no-op contract ser consumido como executor real.',
      'R-PEO-03: Risco de command boundary plan ser tratado como shell plan executável.',
      'R-PEO-04: Risco de pre-run checklist ser confundido com liberação de produção.',
      'R-PEO-05: Risco de dependency matrix ocultar que nenhuma autorização real existe.',
      'R-PEO-06: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PEO-07: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
