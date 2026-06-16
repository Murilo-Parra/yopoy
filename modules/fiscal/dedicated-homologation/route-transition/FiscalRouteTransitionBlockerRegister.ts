export class FiscalRouteTransitionBlockerRegister {
  public static getBlockers() {
    return [
      'B-RTB-01: Transição real de rotas bloqueada.',
      'B-RTB-02: routeToV2 bloqueado.',
      'B-RTB-03: Legado obrigatório preservado.',
      'B-RTB-04: Traffic switch real bloqueado.',
      'B-RTB-05: app.use legado intocado.',
      'B-RTB-06: Middleware/proxy/tap real bloqueado.',
      'B-RTB-07: Handler V2 operacional bloqueado.',
      'B-RTB-08: Handler legado side-effect bloqueado.',
      'B-RTB-09: Produção V2 bloqueada.',
      'B-RTB-10: Release/canary reais bloqueados.',
      'B-RTB-11: Worker/scheduler real bloqueado.',
      'B-RTB-12: Gate unlock real bloqueado.',
      'B-RTB-13: Autorização real bloqueada.',
      'B-RTB-14: Banco/DDL/DML reais bloqueados.',
      'B-RTB-15: SEFAZ/certificado/XML/PDF reais bloqueados.'
    ];
  }
}
