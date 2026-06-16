export class FiscalProductionRuntimeExecutionGraphRiskRegister {
  public static getRisks() {
    return [
      'R-PEG-01: Risco de execution graph ser interpretado como grafo executável.',
      'R-PEG-02: Risco de transaction boundary plan ser confundido com transação real.',
      'R-PEG-03: Risco de DB transaction no-op plan ser convertido em DML/DDL por automação externa.',
      'R-PEG-04: Risco de SEFAZ no-op plan ser interpretado como integração ativa.',
      'R-PEG-05: Risco de signing no-op plan ser confundido com assinatura fiscal real.',
      'R-PEG-06: Risco de idempotency checkpoint plan ser tratado como persistência real.',
      'R-PEG-07: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PEG-08: Risco de testes temporários permanecerem no repositório com prefixo temp.'
    ];
  }
}
