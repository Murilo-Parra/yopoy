export class FiscalDay2ObservabilityDriftBlockerRegister {
  public static getBlockers() {
    return [
      'B-D2OD-01: Observability real bloqueada.',
      'B-D2OD-02: Captura real de métricas bloqueada.',
      'B-D2OD-03: Leitura real de telemetria bloqueada.',
      'B-D2OD-04: Conexão real com Prometheus/Grafana/Datadog/New Relic/OpenTelemetry/Loki/CloudWatch bloqueada.',
      'B-D2OD-05: Dashboard real bloqueado.',
      'B-D2OD-06: Alerta produtivo real bloqueado.',
      'B-D2OD-07: Alert rule real bloqueada.',
      'B-D2OD-08: Avaliação real de SLO/SLA bloqueada.',
      'B-D2OD-09: Persistência real de métricas bloqueada.',
      'B-D2OD-10: Incidente/runbook/mitigação reais bloqueados.',
      'B-D2OD-11: Notificação externa real bloqueada.',
      'B-D2OD-12: Acesso/RBAC/sessão assistida reais bloqueados.',
      'B-D2OD-13: Leitura real de dados/XML/PDF/PFX/segredo bloqueada.',
      'B-D2OD-14: Operação day-2 real bloqueada.',
      'B-D2OD-15: Produção V2 bloqueada.',
      'B-D2OD-16: routeToV2 bloqueado.',
      'B-D2OD-17: Legado obrigatório preservado.',
      'B-D2OD-18: Tráfego real inalterável.',
      'B-D2OD-19: Proxy/middleware/tap/mirror/sniffer reais bloqueados.',
      'B-D2OD-20: app.use/router.use reais intocados.',
      'B-D2OD-21: Handler legado e V2 real bloqueados.',
      'B-D2OD-22: Captura/duplicação/espelhamento real bloqueados.',
      'B-D2OD-23: Runtime/queue/job/worker reais bloqueados.',
      'B-D2OD-24: Command runner/shell reais bloqueados.',
      'B-D2OD-25: Transação real de banco bloqueada.',
      'B-D2OD-26: Banco/DDL/DML reais bloqueados.',
      'B-D2OD-27: SEFAZ real bloqueada.',
      'B-D2OD-28: Certificado/PFX/senha/crypto reais bloqueados.',
      'B-D2OD-29: XML/PDF reais bloqueados.',
      'B-D2OD-30: Autorização/gate real bloqueados.',
      'B-D2OD-31: Deploy/cutover/rollback reais bloqueados.',
      'B-D2OD-32: Pacote/artefato executável real bloqueado.'
    ];
  }
}
