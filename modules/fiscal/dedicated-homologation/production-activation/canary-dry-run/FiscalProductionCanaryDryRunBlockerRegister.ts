export class FiscalProductionCanaryDryRunBlockerRegister {
  public static getBlockers() {
    return [
      'B-PCD-01: Canary real bloqueado.',
      'B-PCD-02: Tráfego real inalterado.',
      'B-PCD-03: Roteamento V2 real bloqueado.',
      'B-PCD-04: Handler V2 operacional bloqueado.',
      'B-PCD-05: app.use legado intocado.',
      'B-PCD-06: Middleware/tap real bloqueado.',
      'B-PCD-07: Release real bloqueado.',
      'B-PCD-08: Gate unlock real bloqueado.',
      'B-PCD-09: Autorização real bloqueada.',
      'B-PCD-10: Banco real desconectado.',
      'B-PCD-11: SEFAZ/certificado/XML/PDF reais bloqueados.',
      'B-PCD-12: Worker/scheduler real bloqueado.',
      'B-PCD-13: Produção V2 bloqueada.'
    ];
  }
}
