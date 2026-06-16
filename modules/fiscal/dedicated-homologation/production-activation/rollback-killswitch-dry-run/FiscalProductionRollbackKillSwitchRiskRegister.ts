export class FiscalProductionRollbackKillSwitchRiskRegister {
  public static getRisks() {
    return [
      'R-PRK-01: Risco de rollback dry-run ser interpretado como rollback instalado.',
      'R-PRK-02: Risco de kill-switch documental ser interpretado como runtime real.',
      'R-PRK-03: Risco de fallback plan ser convertido em alteração real de tráfego sem novo gate.',
      'R-PRK-04: Risco de routeToLegacy documental ocultar ausência de teste real.',
      'R-PRK-05: Risco de freeze plan ser usado como congelamento operacional real.',
      'R-PRK-06: Risco de Produção V2 ser ativada por flag externa.'
    ];
  }
}
