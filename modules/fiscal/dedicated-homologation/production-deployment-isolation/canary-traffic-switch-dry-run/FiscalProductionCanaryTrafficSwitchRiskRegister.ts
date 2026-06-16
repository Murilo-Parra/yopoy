export class FiscalProductionCanaryTrafficSwitchRiskRegister {
  public static getRisks() {
    return [
      'R-PCTS-01: Risco de canary dry-run ser interpretado como canary real.',
      'R-PCTS-02: Risco de traffic switch simulation ser confundido com roteamento real para V2.',
      'R-PCTS-03: Risco de reversible activation plan ser interpretado como Produção V2 reversível já pronta.',
      'R-PCTS-04: Risco de legacy reversion plan ser confundido com fallback real instalado.',
      'R-PCTS-05: Risco de decision checkpoint matrix ser usada como aprovação produtiva definitiva.',
      'R-PCTS-06: Risco de UI administrativa ocultar o estado simulation-only.'
    ];
  }
}
