export class FiscalProductionLoadBalancerDnsRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-LB-DNS-01: Risco de mapeamento ser tratado como execução real.',
      'R-LB-DNS-02: Risco de ativação V2 acidental por bypass sistêmico.',
      'R-LB-DNS-03: Risco de confusão na camada legada.',
      'R-LB-DNS-04: Risco de namespaces colidirem.'
    ];
  }
}
