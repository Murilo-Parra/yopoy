export class FiscalProductionDeploymentFinalBlockerRegister {
  public static getBlockers() {
    return [
      'B-PDC-01: Produção V2 real bloqueada.',
      'B-PDC-02: Deploy real bloqueado.',
      'B-PDC-03: Release real bloqueado.',
      'B-PDC-04: Rollout real bloqueado.',
      'B-PDC-05: Canary real bloqueado.',
      'B-PDC-06: Cutover real bloqueado.',
      'B-PDC-07: Rollback real bloqueado.',
      'B-PDC-08: Pacote real bloqueado.',
      'B-PDC-09: Artefato executável real bloqueado.',
      'B-PDC-10: routeToV2 bloqueado.',
      'B-PDC-11: Legado obrigatório preservado.',
      'B-PDC-12: Tráfego real inalterável.',
      'B-PDC-13: Proxy/middleware/tap real bloqueados.',
      'B-PDC-14: app.use/router.use reais intocados.',
      'B-PDC-15: Handler legado e V2 real bloqueados.',
      'B-PDC-16: Captura/duplicação/espelhamento real bloqueados.',
      'B-PDC-17: Worker/scheduler real bloqueado.',
      'B-PDC-18: Gate unlock real bloqueado.',
      'B-PDC-19: Autorização real bloqueada.',
      'B-PDC-20: Banco/DDL/DML reais bloqueados.',
      'B-PDC-21: SEFAZ/certificado/XML/PDF reais bloqueados.'
    ];
  }
}
