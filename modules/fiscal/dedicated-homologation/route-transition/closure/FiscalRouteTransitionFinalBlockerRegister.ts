export class FiscalRouteTransitionFinalBlockerRegister {
  public static getBlockers() {
    return [
      'B-RTC-01: Aprovação real de transição bloqueada.',
      'B-RTC-02: Transição real de rotas bloqueada.',
      'B-RTC-03: Cutover real bloqueado.',
      'B-RTC-04: routeToV2 bloqueado.',
      'B-RTC-05: Legado obrigatório preservado.',
      'B-RTC-06: Tráfego real inalterável neste módulo.',
      'B-RTC-07: Proxy/middleware/tap real bloqueados.',
      'B-RTC-08: app.use/router.use reais intocados.',
      'B-RTC-09: Handler legado e V2 real bloqueados.',
      'B-RTC-10: Captura/duplicação/espelhamento real bloqueados.',
      'B-RTC-11: Canary/shadow/fallback real bloqueados.',
      'B-RTC-12: Sandbox/walled garden real bloqueados.',
      'B-RTC-13: Rede/banco/tenant real bloqueados.',
      'B-RTC-14: Produção V2 bloqueada.',
      'B-RTC-15: Release real bloqueado.',
      'B-RTC-16: Worker/scheduler real bloqueado.',
      'B-RTC-17: Gate unlock real bloqueado.',
      'B-RTC-18: Autorização real bloqueada.',
      'B-RTC-19: Banco/DDL/DML reais bloqueados.',
      'B-RTC-20: SEFAZ/certificado/XML/PDF reais bloqueados.'
    ];
  }
}
