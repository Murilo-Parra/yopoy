export class FiscalProductionOperationsSignatureActivationGateRiskRegister {
  public static getRisks() {
    return [
      'R-POSAG-01: Risco de activation gate simulation ser interpretada como gate unlock real.',
      'R-POSAG-02: Risco de cryptographic boundary no-op ser confundida com assinatura criptográfica real validada.',
      'R-POSAG-03: Risco de consent-to-activation matrix ser lida como autorização real.',
      'R-POSAG-04: Risco de no-issue token evidence ser confundida com emissão oficial de token.',
      'R-POSAG-05: Risco de dependency matrix ser usada por automação externa como gatilho de Produção V2.',
      'R-POSAG-06: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-POSAG-07: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
