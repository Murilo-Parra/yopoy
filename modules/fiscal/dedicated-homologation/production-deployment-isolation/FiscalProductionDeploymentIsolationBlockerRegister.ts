export class FiscalProductionDeploymentIsolationBlockerRegister {
  public static getBlockers() {
    return [
      'B-PDI-01: Produção V2 real bloqueada.',
      'B-PDI-02: Release real bloqueado.',
      'B-PDI-03: Deploy real bloqueado.',
      'B-PDI-04: Rollout real bloqueado.',
      'B-PDI-05: Canary real bloqueado.',
      'B-PDI-06: Cutover real bloqueado.',
      'B-PDI-07: routeToV2 bloqueado.',
      'B-PDI-08: Legado obrigatório preservado.',
      'B-PDI-09: Tráfego real inalterável neste módulo.',
      'B-PDI-10: Proxy/middleware/tap real bloqueados.',
      'B-PDI-11: app.use/router.use reais intocados.',
      'B-PDI-12: Handler legado e V2 real bloqueados.',
      'B-PDI-13: Captura/duplicação/espelhamento real bloqueados.',
      'B-PDI-14: Sandbox/walled garden real bloqueados.',
      'B-PDI-15: Rede/banco/tenant real bloqueados.',
      'B-PDI-16: Worker/scheduler real bloqueado.',
      'B-PDI-17: Gate unlock real bloqueado.',
      'B-PDI-18: Autorização real bloqueada.',
      'B-PDI-19: Banco/DDL/DML reais bloqueados.',
      'B-PDI-20: SEFAZ/certificado/XML/PDF reais bloqueados.'
    ];
  }
}
