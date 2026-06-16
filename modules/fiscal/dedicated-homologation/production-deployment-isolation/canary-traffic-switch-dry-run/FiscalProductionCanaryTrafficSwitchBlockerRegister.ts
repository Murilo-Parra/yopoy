export class FiscalProductionCanaryTrafficSwitchBlockerRegister {
  public static getBlockers() {
    return [
      'B-PCTS-01: Canary real bloqueado.',
      'B-PCTS-02: Produção V2 bloqueada.',
      'B-PCTS-03: Traffic switch real bloqueado.',
      'B-PCTS-04: routeToV2 bloqueado.',
      'B-PCTS-05: Legado obrigatório preservado.',
      'B-PCTS-06: Tráfego real inalterável neste módulo.',
      'B-PCTS-07: Proxy/middleware/tap real bloqueados.',
      'B-PCTS-08: app.use/router.use reais intocados.',
      'B-PCTS-09: Handler legado e V2 real bloqueados.',
      'B-PCTS-10: Captura de request/response/payload real bloqueada.',
      'B-PCTS-11: Duplicação/espelhamento/shadow traffic real bloqueados.',
      'B-PCTS-12: Release/deploy/rollout real bloqueados.',
      'B-PCTS-13: Cutover/rollback real bloqueados.',
      'B-PCTS-14: Publicação real de pacote bloqueada.',
      'B-PCTS-15: Artefato executável real bloqueado.',
      'B-PCTS-16: Worker/scheduler real bloqueado.',
      'B-PCTS-17: Gate unlock real bloqueado.',
      'B-PCTS-18: Autorização real bloqueada.',
      'B-PCTS-19: Banco/DDL/DML reais bloqueados.',
      'B-PCTS-20: SEFAZ/certificado/XML/PDF reais bloqueados.'
    ];
  }
}
