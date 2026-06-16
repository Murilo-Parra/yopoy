import { FiscalRealApprovalSchemaPolicy } from './FiscalRealApprovalSchemaPolicy';

export class FiscalRealApprovalSchemaReportService {
  public static getReport() {
    return {
      report: FiscalRealApprovalSchemaPolicy.getBaseResult(),
      message: 'O Módulo 17.2 foi encerrado em modo read-only/schema-migration-dry-run-only/controlled-ddl-simulation-only/governance-only/simulation-only. Apenas o dry-run de migration/schema e a simulação controlada de DDL foram preparados. Nenhuma tabela real foi criada, nenhum schema real foi aplicado, nenhuma migration real, DDL real, DML real, INSERT, UPDATE, DELETE ou COMMIT real foi executado. Banco real, approval record real, autorização real, gate unlock real, SEFAZ real, XML/PDF real, Release real, Canary real, Produção V2 e tráfego produtivo permanecem bloqueados.'
    };
  }
}
