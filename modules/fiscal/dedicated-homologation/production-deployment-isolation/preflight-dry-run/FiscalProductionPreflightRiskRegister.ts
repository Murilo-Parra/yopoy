export class FiscalProductionPreflightRiskRegister {
  public static getRisks() {
    return [
      'R-PPF-01: Risco de preflight dry-run ser interpretado como aprovação real de deploy.',
      'R-PPF-02: Risco de environment readiness ser confundido com ambiente produtivo conectado.',
      'R-PPF-03: Risco de artifact readiness ser tratado como artefato pronto para publicação real.',
      'R-PPF-04: Risco de cutover readiness ser confundido com janela real de mudança.',
      'R-PPF-05: Risco de rollback readiness ser confundido com rollback instalado.',
      'R-PPF-06: Risco de security boundary check ser interpretado como validação criptográfica real.',
      'R-PPF-07: Risco de UI administrativa ocultar o estado simulation-only.'
    ];
  }
}
