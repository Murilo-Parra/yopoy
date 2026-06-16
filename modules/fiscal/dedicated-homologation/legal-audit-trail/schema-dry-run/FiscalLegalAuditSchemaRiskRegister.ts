export class FiscalLegalAuditSchemaRiskRegister {
  public static getRisks() {
    return [
      'R-LAS-01: Risco de dry-run ser copiado como migration real.',
      'R-LAS-02: Risco de pseudocomando ser confundido com SQL executável.',
      'R-LAS-03: Risco de RLS plan ser aplicado sem novo gate.',
      'R-LAS-04: Risco de retention policy ser convertida em DELETE real.',
      'R-LAS-05: Risco de schema drift não detectado por ausência de introspection real.',
      'R-LAS-06: Risco de Produção V2 ser ativada por flag externa.'
    ];
  }
}
