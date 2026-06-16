export class FiscalProductionOperationsObservabilityBlockerRegister {
  public static getBlockers() {
    return [
      'B-POO-01: Observability real bloqueada.',
      'B-POO-02: Captura real de métricas bloqueada.',
      'B-POO-03: Leitura real de telemetria bloqueada.',
      'B-POO-04: Conexão Prometheus/Grafana/Datadog/New Relic real bloqueada.',
      'B-POO-05: Dashboard real bloqueado.',
      'B-POO-06: Alerta produtivo real bloqueado.',
      'B-POO-07: Regra de alerta real bloqueada.',
      'B-POO-08: Avaliação real-time de SLO/SLA bloqueada.',
      'B-POO-09: Persistência real de métricas bloqueada.',
      'B-POO-10: Incidente/runbook/mitigação reais bloqueados.',
      'B-POO-11: Notificação real de operador/SRE/cliente bloqueada.',
      'B-POO-12: Slack/WhatsApp/e-mail/webhook/pager/PagerDuty/Opsgenie reais bloqueados.',
      'B-POO-13: Leitura real de dados/documentos/XML/PDF/PFX/certificado/segredo bloqueada.',
      'B-POO-14: Transição operacional real bloqueada.',
      'B-POO-15: Operação produtiva V2 bloqueada.',
      'B-POO-16: Autorização/gate reais bloqueados.',
      'B-POO-17: routeToV2 bloqueado e legado obrigatório preservado.',
      'B-POO-18: Tráfego real inalterável.',
      'B-POO-19: Proxy/middleware/tap/mirror/sniffer reais bloqueados.',
      'B-POO-20: Endpoint/handler/runtime/banco/SEFAZ/certificados reais bloqueados.'
    ];
  }
}
