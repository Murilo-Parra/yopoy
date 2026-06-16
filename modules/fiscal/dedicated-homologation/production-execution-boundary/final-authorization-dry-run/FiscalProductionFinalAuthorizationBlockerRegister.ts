export class FiscalProductionFinalAuthorizationBlockerRegister {
  public static getBlockers() {
    return [
      'B-PFA-01: Autorização real bloqueada.',
      'B-PFA-02: Gate real bloqueado.',
      'B-PFA-03: Aprovação real de comitê bloqueada.',
      'B-PFA-04: Pacote real de autorização bloqueado.',
      'B-PFA-05: Approval record real bloqueado.',
      'B-PFA-06: Notificação externa real bloqueada.',
      'B-PFA-07: Deploy real bloqueado.',
      'B-PFA-08: Release real bloqueado.',
      'B-PFA-09: Rollout real bloqueado.',
      'B-PFA-10: Canary real bloqueado.',
      'B-PFA-11: Cutover real bloqueado.',
      'B-PFA-12: Rollback real bloqueado.',
      'B-PFA-13: Pacote real publicado bloqueado.',
      'B-PFA-14: Artefato executável real bloqueado.',
      'B-PFA-15: Produção V2 bloqueada.',
      'B-PFA-16: routeToV2 bloqueado.',
      'B-PFA-17: Legado obrigatório preservado.',
      'B-PFA-18: Tráfego real inalterável.',
      'B-PFA-19: Proxy/middleware/tap real bloqueados.',
      'B-PFA-20: app.use/router.use reais intocados.',
      'B-PFA-21: Handler legado e V2 real bloqueados.',
      'B-PFA-22: Captura/duplicação/espelhamento real bloqueados.',
      'B-PFA-23: Worker/scheduler real bloqueado.',
      'B-PFA-24: Banco/DDL/DML reais bloqueados.',
      'B-PFA-25: SEFAZ/certificado/XML/PDF reais bloqueados.'
    ];
  }
}
