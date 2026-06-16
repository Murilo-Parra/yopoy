export class FiscalProductionComplianceFindingRiskRegister {
  public static getRisks() {
    return [
      'R-PCF-01: Risco de finding review ser interpretado como finding real.',
      'R-PCF-02: Risco de remediation action no-op ser confundido com ação corretiva real.',
      'R-PCF-03: Risco de severity matrix ser lida como incidente real aberto.',
      'R-PCF-04: Risco de owner assignment ser interpretado como atribuição operacional real.',
      'R-PCF-05: Risco de waiver no-persistence ser entendido como waiver jurídico real.',
      'R-PCF-06: Risco de remediation verification no-execute ser confundida com validação externa real.',
      'R-PCF-07: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PCF-08: Risco de testes temporários permanecerem no repositório.',
      'R-PCF-09: Risco de namespace/export colidir com Domains 32, 33, 34, 35, 36.1 ou 36.2.',
      'R-PCF-10: Risco de automação externa tratar finding no-op como ticket real de compliance.'
    ];
  }
}
