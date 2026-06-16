export class FiscalProductionActivationConsentRiskRegister {
  public static getRisks() {
    return [
      'R-PAC-01: Risco de intake de consentimento ser interpretado como autorização real.',
      'R-PAC-02: Risco de envelope não executável ser confundido com assinatura real.',
      'R-PAC-03: Risco de two-person simulation ser tratada como aprovação real.',
      'R-PAC-04: Risco de matriz de elegibilidade ser usada por automação externa como permissão real.',
      'R-PAC-05: Risco de no-notification evidence ocultar ausência de notificação real.',
      'R-PAC-06: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PAC-07: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
