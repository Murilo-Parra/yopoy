export class FiscalRouteCanaryShadowBlockerRegister {
  public static getBlockers() {
    return [
      'B-RCS-01: Canary real bloqueado.',
      'B-RCS-02: Shadow traffic real bloqueado.',
      'B-RCS-03: Traffic mirror real bloqueado.',
      'B-RCS-04: Duplicação real de request bloqueada.',
      'B-RCS-05: Captura real de response/payload bloqueada.',
      'B-RCS-06: Proxy/middleware/tap real bloqueados.',
      'B-RCS-07: app.use/router.use reais intocados.',
      'B-RCS-08: routeToV2 bloqueado.',
      'B-RCS-09: Legado obrigatório preservado.',
      'B-RCS-10: Handler V2 operacional bloqueado.',
      'B-RCS-11: Handler legado side-effect bloqueado.',
      'B-RCS-12: Produção V2 bloqueada.',
      'B-RCS-13: Release real bloqueado.',
      'B-RCS-14: Worker/scheduler real bloqueado.',
      'B-RCS-15: Gate unlock real bloqueado.',
      'B-RCS-16: Autorização real bloqueada.',
      'B-RCS-17: Banco/DDL/DML reais bloqueados.',
      'B-RCS-18: SEFAZ/certificado/XML/PDF reais bloqueados.'
    ];
  }
}
