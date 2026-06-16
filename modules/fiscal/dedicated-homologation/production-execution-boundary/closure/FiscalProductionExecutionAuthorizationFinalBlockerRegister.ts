export class FiscalProductionExecutionAuthorizationFinalBlockerRegister {
  public static getBlockers() {
    return [
      'B-PEAC-01: Autorização real bloqueada.',
      'B-PEAC-02: Gate real bloqueado.',
      'B-PEAC-03: Aprovação real de comitê bloqueada.',
      'B-PEAC-04: Pacote real de autorização bloqueado.',
      'B-PEAC-05: Approval record real bloqueado.',
      'B-PEAC-06: Notificação externa real bloqueada.',
      'B-PEAC-07: Deploy real bloqueado.',
      'B-PEAC-08: Release real bloqueado.',
      'B-PEAC-09: Rollout real bloqueado.',
      'B-PEAC-10: Canary real bloqueado.',
      'B-PEAC-11: Cutover real bloqueado.',
      'B-PEAC-12: Rollback real bloqueado.',
      'B-PEAC-13: Pacote real publicado bloqueado.',
      'B-PEAC-14: Artefato executável real bloqueado.',
      'B-PEAC-15: Produção V2 bloqueada.',
      'B-PEAC-16: routeToV2 bloqueado.',
      'B-PEAC-17: Legado obrigatório preservado.',
      'B-PEAC-18: Tráfego real inalterável.',
      'B-PEAC-19: Proxy/middleware/tap real bloqueados.',
      'B-PEAC-20: app.use/router.use reais intocados.',
      'B-PEAC-21: Handler legado e V2 real bloqueados.',
      'B-PEAC-22: Captura/duplicação/espelhamento real bloqueados.',
      'B-PEAC-23: Worker/scheduler real bloqueado.',
      'B-PEAC-24: Banco/DDL/DML reais bloqueados.',
      'B-PEAC-25: SEFAZ/certificado/XML/PDF reais bloqueados.'
    ];
  }
}
