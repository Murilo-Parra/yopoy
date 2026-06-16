export class FiscalProductionOperationsReadinessFinalRiskRegister {
  public static getRisks() {
    return [
      'R-PORC-01: Risco de closure administrativo ser interpretado como handoff operacional real.',
      'R-PORC-02: Risco de final evidence package ser confundido com autorização de operação V2.',
      'R-PORC-03: Risco de no-activation handoff ser lido como ativação real.',
      'R-PORC-04: Risco de roadmap pós-closure ser usado por automação externa como sinal de produção ativa.',
      'R-PORC-05: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PORC-06: Risco de pacotes de evidência serem usados como gatilho indevido de deploy, access grant ou observability real.',
      'R-PORC-07: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
