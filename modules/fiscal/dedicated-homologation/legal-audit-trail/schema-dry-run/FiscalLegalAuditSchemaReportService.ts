export class FiscalLegalAuditSchemaReportService {
  public static getReport() {
    return {
      reportType: 'LEGAL_AUDIT_SCHEMA_DRY_RUN_AND_RETENTION_RLS_SIMULATION',
      message: 'O Módulo 18.2 foi encerrado em modo read-only/legal-audit-schema-dry-run-only/retention-rls-ddl-simulation-only/governance-only/simulation-only. Apenas o dry-run de schema/migration, retenção e RLS do ledger de trilha legal foi preparado. Nenhum ledger real foi criado, nenhum schema real foi aplicado, nenhuma migration real, DDL real, DML real, INSERT, UPDATE, DELETE ou COMMIT real foi executado. RLS real, índice real, política de retenção real, banco real, trilha legal real, autorização real, endpoint externo real, SEFAZ real, XML/PDF real, Release real, Canary real, Produção V2 e tráfego produtivo permanecem bloqueados.',
      status: 'RETENTION_RLS_DDL_SIMULATION_READY',
      simulationOnly: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
  }
}
