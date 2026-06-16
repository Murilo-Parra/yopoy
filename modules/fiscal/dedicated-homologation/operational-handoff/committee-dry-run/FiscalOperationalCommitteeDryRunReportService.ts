export class FiscalOperationalCommitteeDryRunReportService {
  public static getReport() {
    return {
      reportType: 'ARCHITECTURE_RISK_COMMITTEE_AND_APPROVAL_DRY_RUN',
      message: 'O Módulo 20.3 foi encerrado em modo read-only/architecture-risk-committee-dry-run-only/committee-approval-simulation-only/governance-only/simulation-only. Apenas a simulação de comitê, aprovação documental, quórum, risk acceptance, waiver e revisão de evidências foi preparada. Nenhuma aprovação real de comitê foi concedida, nenhum risco real foi aceito, nenhum waiver real foi concedido, nenhum aprovador externo foi notificado, nenhum ticket real foi criado, nenhum incidente real foi aberto, nenhum runbook real foi executado, nenhuma observability real foi instalada, nenhum alerta produtivo foi criado, nenhuma Produção V2 foi ativada, nenhum tráfego real foi alterado, nenhum app.use legado foi modificado, nenhum middleware/tap real foi instalado, nenhum worker/scheduler foi criado, SEFAZ real, certificado real, XML/PDF real e rotas produtivas permanecem bloqueados.',
      status: 'COMMITTEE_APPROVAL_SIMULATION_READY',
      simulationOnly: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
  }
}
