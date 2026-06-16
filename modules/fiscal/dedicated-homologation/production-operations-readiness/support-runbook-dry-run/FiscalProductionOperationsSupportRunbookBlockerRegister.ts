export class FiscalProductionOperationsSupportRunbookBlockerRegister {
  public static getBlockers() {
    return [
      'B-POSR-01: Incidente real bloqueado.',
      'B-POSR-02: Runbook real bloqueado.',
      'B-POSR-03: Mitigação real bloqueada.',
      'B-POSR-04: Rollback real bloqueado.',
      'B-POSR-05: Notificação real de operador/SRE/cliente/stakeholder bloqueada.',
      'B-POSR-06: Slack/WhatsApp/e-mail/webhook/pager/PagerDuty/Opsgenie reais bloqueados.',
      'B-POSR-07: Observability e alerta produtivo reais bloqueados.',
      'B-POSR-08: Acesso operacional/RBAC/sessão assistida reais bloqueados.',
      'B-POSR-09: Leitura real de dados/documentos/XML/PDF/PFX/certificado/segredo bloqueada.',
      'B-POSR-10: Transição operacional real bloqueada.',
      'B-POSR-11: Operação produtiva V2 bloqueada.',
      'B-POSR-12: Autorização/gate reais bloqueados.',
      'B-POSR-13: routeToV2 bloqueado e legado obrigatório preservado.',
      'B-POSR-14: Tráfego real inalterável.',
      'B-POSR-15: Proxy/middleware/tap/mirror/sniffer reais bloqueados.',
      'B-POSR-16: Captura de request/response/payload real bloqueada.',
      'B-POSR-17: Endpoint e handlers reais bloqueados.',
      'B-POSR-18: Runtime/queue/job/worker reais bloqueados.',
      'B-POSR-19: Banco/DDL/DML/SEFAZ/certificados reais bloqueados.'
    ];
  }
}
