export class FiscalProductionDualRunRiskRegister {
  public static getRisks() {
    return [
      'R-PDR-01: Risco de dual-run dry-run ser interpretado como dual-run ativo.',
      'R-PDR-02: Risco de telemetry readiness ser confundida com captura real.',
      'R-PDR-03: Risco de comparação Legacy versus V2 ser usada sem tráfego real controlado.',
      'R-PDR-04: Risco de reversible activation plan ser tratado como autorização operacional.',
      'R-PDR-05: Risco de rollback criteria documental ser confundido com rollback instalado.',
      'R-PDR-06: Risco de Produção V2 ser ativada por flag externa.'
    ];
  }
}
