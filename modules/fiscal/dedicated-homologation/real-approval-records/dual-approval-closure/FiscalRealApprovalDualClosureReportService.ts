export class FiscalRealApprovalDualClosureReportService {
  public static getReport() {
    return {
      reportType: 'DUAL_APPROVAL_CONCLUSION_SIMULATION_AND_GOVERNANCE_CLOSURE',
      message: 'O Módulo 17 foi encerrado documentalmente em modo read-only/dual-approval-conclusion-simulation-only/approval-record-governance-closure-only/governance-only/simulation-only. Apenas a simulação de conclusão de dupla aprovação e o fechamento documental de governança do domínio Approval Record foram preparados. Nenhum dual approval real foi concluído, nenhum approval record real foi persistido ou assinado, nenhuma autorização real foi concedida, nenhum endpoint externo real foi chamado, nenhum DML/DDL real foi executado, banco real, SEFAZ real, XML/PDF real, Release real, Canary real, Produção V2 e tráfego produtivo permanecem bloqueados.',
      status: 'APPROVAL_RECORD_GOVERNANCE_CLOSURE_READY',
      simulationOnly: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
  }
}
