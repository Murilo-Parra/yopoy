export class FiscalOperationalObservabilityDryRunReportService {
  public static getReport() {
    return {
      reportType: 'OPERATIONAL_OBSERVABILITY_AND_ALERTING_DRY_RUN',
      message: 'O Módulo 20.2 foi encerrado em modo read-only/operational-observability-dry-run-only/alerting-governance-dry-run-only/governance-only/simulation-only. Apenas a simulação de observability, alerting, dashboards, SLO/SLA, incident triggers, retenção de telemetria e sinais de escalonamento foi preparada. Nenhuma observability real foi instalada, nenhum alerta produtivo foi criado, nenhum incidente real foi aberto, nenhum operador externo foi notificado, nenhum webhook, Slack, WhatsApp ou email real foi enviado, nenhuma request/response real foi capturada, nenhum runbook real foi executado, nenhuma Produção V2 foi ativada, nenhum tráfego real foi alterado, nenhum app.use legado foi modificado, nenhum middleware/tap real foi instalado, nenhum worker/scheduler foi criado, SEFAZ real, certificado real, XML/PDF real e rotas produtivas permanecem bloqueados.',
      status: 'ALERTING_GOVERNANCE_DRY_RUN_READY',
      simulationOnly: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
  }
}
