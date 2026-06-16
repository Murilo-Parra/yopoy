export class FiscalProductionOperationsTransitionFinalRiskRegister {
  public static getRisks() {
    return [
      'R-POTC-01: Risco de closure ser interpretado como autorização real.',
      'R-POTC-02: Risco de pacote de evidência ser confundido com go-live.',
      'R-POTC-03: Risco de handoff sem ativação ser tratado como liberação produtiva.',
      'R-POTC-04: Risco de roadmap pós-closure ser lido por automação externa como permissão de execução.',
      'R-POTC-05: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-POTC-06: Risco de closure gerar pressão indevida para routeToV2 real.',
      'R-POTC-07: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
