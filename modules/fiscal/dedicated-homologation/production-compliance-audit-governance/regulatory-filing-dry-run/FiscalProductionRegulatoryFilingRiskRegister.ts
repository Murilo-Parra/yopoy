export class FiscalProductionRegulatoryFilingRiskRegister {
  public static getRisks() {
    return [
      'R-PRF-01: Risco de filing simulation profile ser interpretado como filing real.',
      'R-PRF-02: Risco de submission payload no-op ser confundido com payload enviado.',
      'R-PRF-03: Risco de protocol no-issue ser tratado como protocolo regulatório emitido.',
      'R-PRF-04: Risco de attachment no-file ser entendido como anexação real.',
      'R-PRF-05: Risco de validation rules no-execute ser confundido com validação externa real.',
      'R-PRF-06: Risco de no-submission evidence ser lido como comprovante de filing real.',
      'R-PRF-07: Risco de UI administrativa ocultar o estado simulation-only.',
      'R-PRF-08: Risco de testes temporários permanecerem no repositório.',
      'R-PRF-09: Risco de namespace/export colidir com Domains 32, 33, 34, 35 ou 36.1.',
      'R-PRF-10: Risco de automação externa tratar payload no-op como submissão regulatória real.'
    ];
  }
}
