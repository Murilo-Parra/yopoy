export class FiscalRouteSandboxBlockerRegister {
  public static getBlockers() {
    return [
      'B-RSB-01: Sandbox real bloqueado.',
      'B-RSB-02: Walled garden real bloqueado.',
      'B-RSB-03: Provisionamento real de rede bloqueado.',
      'B-RSB-04: Provisionamento real de banco bloqueado.',
      'B-RSB-05: Tenant real isolado bloqueado.',
      'B-RSB-06: Execução real de rota bloqueada.',
      'B-RSB-07: Chamada a endpoint real bloqueada.',
      'B-RSB-08: Handler legado real bloqueado.',
      'B-RSB-09: Handler V2 operacional bloqueado.',
      'B-RSB-10: Captura real de request/response/payload bloqueada.',
      'B-RSB-11: Shadow/mirror/cutover real bloqueados.',
      'B-RSB-12: routeToV2 bloqueado.',
      'B-RSB-13: Legado obrigatório preservado.',
      'B-RSB-14: Proxy/middleware/tap real bloqueados.',
      'B-RSB-15: app.use/router.use reais intocados.',
      'B-RSB-16: Produção V2 bloqueada.',
      'B-RSB-17: Worker/scheduler real bloqueado.',
      'B-RSB-18: Gate unlock real bloqueado.',
      'B-RSB-19: Autorização real bloqueada.',
      'B-RSB-20: Banco/DDL/DML reais bloqueados.',
      'B-RSB-21: SEFAZ/certificado/XML/PDF reais bloqueados.'
    ];
  }
}
