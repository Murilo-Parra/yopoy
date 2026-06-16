export class FiscalDay2IncidentRunbookBlockerRegister {
  public static getBlockers() {
    return [
      'B-D2IR-01: Incidente real bloqueado.',
      'B-D2IR-02: Runbook real bloqueado.',
      'B-D2IR-03: Alerta produtivo real bloqueado.',
      'B-D2IR-04: Observability real bloqueada.',
      'B-D2IR-05: Notificação externa real bloqueada.',
      'B-D2IR-06: Notificação SRE/stakeholder/cliente real bloqueada.',
      'B-D2IR-07: Slack/WhatsApp/e-mail/webhook/pager reais bloqueados.',
      'B-D2IR-08: Mitigação real bloqueada.',
      'B-D2IR-09: Rollback real bloqueado.',
      'B-D2IR-10: Acesso/RBAC/sessão assistida reais bloqueados.',
      'B-D2IR-11: Leitura real de dados/XML/PDF/PFX/segredo bloqueada.',
      'B-D2IR-12: Operação day-2 real bloqueada.',
      'B-D2IR-13: Produção V2 bloqueada.',
      'B-D2IR-14: routeToV2 bloqueado.',
      'B-D2IR-15: Legado obrigatório preservado.',
      'B-D2IR-16: Tráfego real inalterável.',
      'B-D2IR-17: Proxy/middleware/tap/mirror/sniffer reais bloqueados.',
      'B-D2IR-18: app.use/router.use reais intocados.',
      'B-D2IR-19: Handler legado e V2 real bloqueados.',
      'B-D2IR-20: Captura/duplicação/espelhamento real bloqueados.',
      'B-D2IR-21: Runtime/queue/job/worker reais bloqueados.',
      'B-D2IR-22: Command runner/shell reais bloqueados.',
      'B-D2IR-23: Transação real de banco bloqueada.',
      'B-D2IR-24: Banco/DDL/DML reais bloqueados.',
      'B-D2IR-25: SEFAZ real bloqueada.',
      'B-D2IR-26: Certificado/PFX/senha/crypto reais bloqueados.',
      'B-D2IR-27: XML/PDF reais bloqueados.',
      'B-D2IR-28: Autorização real bloqueada.',
      'B-D2IR-29: Gate real bloqueado.',
      'B-D2IR-30: Deploy/cutover/rollback reais bloqueados.',
      'B-D2IR-31: Pacote/artefato executável real bloqueado.'
    ];
  }
}
