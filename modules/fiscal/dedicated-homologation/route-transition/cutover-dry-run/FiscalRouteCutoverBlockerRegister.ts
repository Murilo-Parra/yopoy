export class FiscalRouteCutoverBlockerRegister {
  public static getBlockers() {
    return [
      'B-RCD-01: Cutover real bloqueado.',
      'B-RCD-02: Transição real de rotas bloqueada.',
      'B-RCD-03: routeToV2 bloqueado.',
      'B-RCD-04: Legado obrigatório preservado.',
      'B-RCD-05: Traffic switch real bloqueado.',
      'B-RCD-06: Canary real bloqueado.',
      'B-RCD-07: Shadow rollback real bloqueado.',
      'B-RCD-08: Fallback real bloqueado.',
      'B-RCD-09: Proxy/middleware/tap real bloqueados.',
      'B-RCD-10: app.use/router.use reais intocados.',
      'B-RCD-11: Duplicação/captura real bloqueada.',
      'B-RCD-12: Handler V2 operacional bloqueado.',
      'B-RCD-13: Handler legado side-effect bloqueado.',
      'B-RCD-14: Produção V2 bloqueada.',
      'B-RCD-15: Release real bloqueado.',
      'B-RCD-16: Worker/scheduler real bloqueado.',
      'B-RCD-17: Gate unlock real bloqueado.',
      'B-RCD-18: Autorização real bloqueada.',
      'B-RCD-19: Banco/DDL/DML reais bloqueados.',
      'B-RCD-20: SEFAZ/certificado/XML/PDF reais bloqueados.'
    ];
  }
}
