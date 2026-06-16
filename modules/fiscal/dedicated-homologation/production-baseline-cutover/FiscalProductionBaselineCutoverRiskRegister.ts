export class FiscalProductionBaselineCutoverRiskRegister {
  public static getRisks() {
    return [
      'R-PBC-01: Risco de baseline cutover readiness ser interpretado como execução real.',
      'R-PBC-02: Risco de hard execution lock ser confundido com gate destravado.',
      'R-PBC-03: Risco de matriz de pré-condição ser usada por automação externa como autorização.',
      'R-PBC-04: Risco de plano de continuidade legada ocultar que V2 segue bloqueada.',
      'R-PBC-05: Risco de plano de ativação V2 travada ser lido como ativação pendente imediata.',
      'R-PBC-06: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PBC-07: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
