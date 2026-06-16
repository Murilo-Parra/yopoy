export class FiscalSyntheticRouteDryRunBlockerRegister {
  public static getBlockers() {
    return [
      'B-SRD-01: Execução real de rota bloqueada.',
      'B-SRD-02: Chamada a endpoint real bloqueada.',
      'B-SRD-03: Handler legado real bloqueado.',
      'B-SRD-04: Handler V2 operacional bloqueado.',
      'B-SRD-05: Captura real de request/response/payload bloqueada.',
      'B-SRD-06: Duplicação real de request bloqueada.',
      'B-SRD-07: Shadow/mirror real bloqueado.',
      'B-SRD-08: Cutover real bloqueado.',
      'B-SRD-09: routeToV2 bloqueado.',
      'B-SRD-10: Legado obrigatório preservado.',
      'B-SRD-11: Proxy/middleware/tap real bloqueados.',
      'B-SRD-12: app.use/router.use reais intocados.',
      'B-SRD-13: Produção V2 bloqueada.',
      'B-SRD-14: Release/canary reais bloqueados.',
      'B-SRD-15: Worker/scheduler real bloqueado.',
      'B-SRD-16: Gate unlock real bloqueado.',
      'B-SRD-17: Autorização real bloqueada.',
      'B-SRD-18: Banco/DDL/DML reais bloqueados.',
      'B-SRD-19: SEFAZ/certificado/XML/PDF reais bloqueados.'
    ];
  }
}
