export class FiscalProductionCutoverFinalRiskRegister {
  public static getRisks() {
    return [
      'R-PCC-01: Risco de closure ser interpretado como autorização de cutover.',
      'R-PCC-02: Risco de evidence package ser confundido com aprovação real de go-live.',
      'R-PCC-03: Risco de no-activation handoff ser usado por automação externa como gatilho.',
      'R-PCC-04: Risco de checklist final ser interpretado como readiness produtivo completo.',
      'R-PCC-05: Risco de roadmap pós-closure ocultar a necessidade de novo domínio de execução real.',
      'R-PCC-06: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PCC-07: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
