export class FiscalProductionOperationsSignatureGovernanceRiskRegister {
  public static getRisks() {
    return [
      'R-POSG-01: Risco de signature governance blueprint ser interpretado como assinatura real.',
      'R-POSG-02: Risco de activation consent contract ser confundido com autorização de ativação.',
      'R-POSG-03: Risco de two-person signature simulation ser lida como aprovação real.',
      'R-POSG-04: Risco de non-cryptographic signature envelope ser confundido com assinatura criptográfica.',
      'R-POSG-05: Risco de evidence package ser usado por automação externa como gatilho de gate unlock.',
      'R-POSG-06: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-POSG-07: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
