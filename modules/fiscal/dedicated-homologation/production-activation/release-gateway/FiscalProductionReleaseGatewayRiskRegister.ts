export class FiscalProductionReleaseGatewayRiskRegister {
  public static getRisks() {
    return [
      'R-PRG-01: Risco de handshake dry-run ser interpretado como release real.',
      'R-PRG-02: Risco de readiness validator ser tratado como autorização operacional.',
      'R-PRG-03: Risco de dependências documentais serem interpretadas como dependências reais concluídas.',
      'R-PRG-04: Risco de routeToV2 ser ativado por flag externa.',
      'R-PRG-05: Risco de rollback/kill-switch documental ser confundido com runtime instalado.',
      'R-PRG-06: Risco de Produção V2 ser ativada sem novo gate explícito.'
    ];
  }
}
