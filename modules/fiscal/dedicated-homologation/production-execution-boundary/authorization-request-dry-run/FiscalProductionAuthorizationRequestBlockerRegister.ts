export class FiscalProductionAuthorizationRequestBlockerRegister {
  public static getBlockers() {
    return [
      'B-PAR-01: Persistência real de solicitação bloqueada.',
      'B-PAR-02: Submissão real a stakeholders bloqueada.',
      'B-PAR-03: Notificação externa real bloqueada.',
      'B-PAR-04: Gate real bloqueado.',
      'B-PAR-05: Autorização real bloqueada.',
      'B-PAR-06: Deploy real bloqueado.',
      'B-PAR-07: Release real bloqueado.',
      'B-PAR-08: Rollout real bloqueado.',
      'B-PAR-09: Canary real bloqueado.',
      'B-PAR-10: Cutover real bloqueado.',
      'B-PAR-11: Rollback real bloqueado.',
      'B-PAR-12: Pacote real bloqueado.',
      'B-PAR-13: Artefato executável real bloqueado.',
      'B-PAR-14: Produção V2 bloqueada.',
      'B-PAR-15: routeToV2 bloqueado.',
      'B-PAR-16: Legado obrigatório preservado.',
      'B-PAR-17: Tráfego real inalterável.',
      'B-PAR-18: Proxy/middleware/tap real bloqueados.',
      'B-PAR-19: app.use/router.use reais intocados.',
      'B-PAR-20: Handler legado e V2 real bloqueados.',
      'B-PAR-21: Captura/duplicação/espelhamento real bloqueados.',
      'B-PAR-22: Worker/scheduler real bloqueado.',
      'B-PAR-23: Banco/DDL/DML reais bloqueados.',
      'B-PAR-24: SEFAZ/certificado/XML/PDF reais bloqueados.'
    ];
  }
}
