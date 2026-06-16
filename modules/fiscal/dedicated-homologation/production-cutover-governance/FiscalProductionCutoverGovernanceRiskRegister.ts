export class FiscalProductionCutoverGovernanceRiskRegister {
  public static getRisks() {
    return [
      'R-PCG-01: Risco de cutover blueprint ser interpretado como cutover autorizado.',
      'R-PCG-02: Risco de reversible go-live no-op contract ser confundido com go-live real.',
      'R-PCG-03: Risco de traffic switch no-op plan ser convertido em configuração ativa por automação externa.',
      'R-PCG-04: Risco de legacy preservation plan ser ignorado por leitura parcial do dashboard.',
      'R-PCG-05: Risco de reversion path plan ser entendido como rollback operacional instalado.',
      'R-PCG-06: Risco de readiness matrix ser interpretada como aprovação formal de produção.',
      'R-PCG-07: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PCG-08: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
