export class FiscalProductionComplianceReleaseGatekeeperRiskRegister {
  public static getRisks() {
    return [
      'R-PCRG-01: Risco de release validation ser interpretado como aprovação real.',
      'R-PCRG-02: Risco de regulatory gatekeeper no-op ser confundido com unlock real.',
      'R-PCRG-03: Risco de finding clearance no-persistence ser entendido como clearance jurídico real.',
      'R-PCRG-04: Risco de remediation acceptance no-op ser tratado como remediação validada externamente.',
      'R-PCRG-05: Risco de filing status no-submit ser confundido com protocolo regulatório aceito.',
      'R-PCRG-06: Risco de release hold no-activation ser lido como janela real de release.',
      'R-PCRG-07: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PCRG-08: Risco de testes temporários permanecerem no repositório.',
      'R-PCRG-09: Risco de namespace/export colidir com Domains 32, 33, 34, 35, 36.1, 36.2 ou 36.3.',
      'R-PCRG-10: Risco de automação externa tratar gatekeeper no-op como liberação real de release.'
    ];
  }
}
