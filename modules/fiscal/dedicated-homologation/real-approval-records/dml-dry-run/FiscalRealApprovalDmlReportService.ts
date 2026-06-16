import { FiscalRealApprovalDmlPolicy } from './FiscalRealApprovalDmlPolicy';

export class FiscalRealApprovalDmlReportService {
  public static getReport() {
    return {
      report: FiscalRealApprovalDmlPolicy.getBaseResult(),
      message: 'O Módulo 17.3 foi encerrado em modo read-only/dml-seed-dry-run-only/controlled-data-mutation-simulation-only/governance-only/simulation-only. Apenas o dry-run de seed/DML e a simulação controlada de mutação de dados foram preparados. Nenhum INSERT, UPDATE, DELETE, COMMIT ou DML real foi executado. Banco real, approval record real, autorização real, gate unlock real, SEFAZ real, XML/PDF real, Release real, Canary real, Produção V2 e tráfego produtivo permanecem bloqueados.'
    };
  }
}
