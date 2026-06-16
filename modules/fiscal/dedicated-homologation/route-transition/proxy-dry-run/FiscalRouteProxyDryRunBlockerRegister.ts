export class FiscalRouteProxyDryRunBlockerRegister {
  public static getBlockers() {
    return [
      'B-RPD-01: Proxy real bloqueado.',
      'B-RPD-02: Middleware real bloqueado.',
      'B-RPD-03: Tap real bloqueado.',
      'B-RPD-04: app.use legado intocado.',
      'B-RPD-05: router.use real intocado.',
      'B-RPD-06: Captura real de request/response bloqueada.',
      'B-RPD-07: routeToV2 bloqueado.',
      'B-RPD-08: Legado obrigatório preservado.',
      'B-RPD-09: Traffic switch real bloqueado.',
      'B-RPD-10: Handler V2 operacional bloqueado.',
      'B-RPD-11: Handler legado side-effect bloqueado.',
      'B-RPD-12: Produção V2 bloqueada.',
      'B-RPD-13: Release/canary reais bloqueados.',
      'B-RPD-14: Worker/scheduler real bloqueado.',
      'B-RPD-15: Gate unlock real bloqueado.',
      'B-RPD-16: Autorização real bloqueada.',
      'B-RPD-17: Banco/DDL/DML reais bloqueados.',
      'B-RPD-18: SEFAZ/certificado/XML/PDF reais bloqueados.'
    ];
  }
}
