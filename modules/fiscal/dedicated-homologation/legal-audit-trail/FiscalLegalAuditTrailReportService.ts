export class FiscalLegalAuditTrailReportService {
  public static getReport() {
    return {
      reportType: 'LEGAL_AUDIT_LEDGER_BLUEPRINT_AND_PERSISTENCE_ISOLATION_CONTRACT',
      message: 'O Módulo 18.1 foi encerrado em modo read-only/legal-audit-ledger-blueprint-only/persistence-isolation-contract-only/governance-only/simulation-only. Apenas o blueprint do ledger de trilha legal e o contrato de isolamento de persistência foram preparados. Nenhum ledger real foi criado, nenhuma trilha legal real foi persistida, nenhum approval record real foi persistido ou assinado, nenhum schema real, migration real, DDL real, DML real, INSERT, UPDATE, DELETE ou COMMIT real foi executado. Banco real, autorização real, dual approval real, gate unlock real, endpoint externo real, SEFAZ real, XML/PDF real, Release real, Canary real, Produção V2 e tráfego produtivo permanecem bloqueados.',
      status: 'PERSISTENCE_ISOLATION_CONTRACT_READY',
      simulationOnly: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
  }
}
