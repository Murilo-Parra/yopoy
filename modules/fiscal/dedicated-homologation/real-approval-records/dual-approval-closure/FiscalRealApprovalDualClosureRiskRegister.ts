export class FiscalRealApprovalDualClosureRiskRegister {
  public static getRisks() {
    return [
      'R-ADC-01: Risco de simulação de dual approval ser interpretada como aprovação real.',
      'R-ADC-02: Risco de closure ser interpretado como autorização operacional.',
      'R-ADC-03: Risco de aprovador externo ser notificado sem novo módulo explícito.',
      'R-ADC-04: Risco de evidence package conter dados sensíveis.',
      'R-ADC-05: Risco de Produção V2 ser ativada por flag externa.'
    ];
  }
}
