export class FiscalLegalAuditEventReportService {
  public static getReport() {
    return {
      reportType: 'LEGAL_AUDIT_EVENT_DRY_RUN_AND_CONTROLLED_LEDGER_DML_SIMULATION',
      message: 'O Módulo 18.3 foi encerrado em modo read-only/legal-audit-event-dry-run-only/controlled-ledger-dml-simulation-only/governance-only/simulation-only. Apenas o dry-run de eventos do ledger e a simulação controlada de DML append-only foram preparados. Nenhum evento real foi persistido, nenhuma trilha legal real foi persistida, nenhum INSERT, UPDATE, DELETE, COMMIT ou DML real foi executado. Banco real, approval record real, autorização real, dual approval real, gate unlock real, endpoint externo real, SEFAZ real, XML/PDF real, Release real, Canary real, Produção V2 e tráfego produtivo permanecem bloqueados.',
      status: 'CONTROLLED_LEDGER_DML_SIMULATION_READY',
      simulationOnly: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
  }
}
