export class FiscalOperationalHandoffRiskRegister {
  public static getRisks() {
    return [
      'R-OHB-01: Risco de runbook blueprint ser interpretado como runbook executado.',
      'R-OHB-02: Risco de escalation plan ser usado para notificação real sem novo gate.',
      'R-OHB-03: Risco de observability readiness ser confundida com monitoramento instalado.',
      'R-OHB-04: Risco de incident response documental ser tratado como incidente aberto.',
      'R-OHB-05: Risco de handoff operacional ser usado como autorização de produção.',
      'R-OHB-06: Risco de Produção V2 ser ativada por flag externa.'
    ];
  }
}
