export class FiscalLegalAuditClosureReportService {
  public static getReport() {
    return {
      reportType: 'LEGAL_AUDIT_GOVERNANCE_CLOSURE_AND_AUDITOR_HANDOFF',
      message: 'O Módulo 18 foi encerrado documentalmente em modo read-only/legal-audit-governance-closure-only/auditor-handoff-evidence-only/governance-only/simulation-only. Apenas o fechamento documental do domínio Legal Audit Trail, o pacote de evidências e o handoff administrativo para auditoria foram preparados. Nenhum ledger real foi criado, nenhuma trilha legal real foi persistida, nenhum hash legal definitivo foi calculado, nenhuma trilha legal real foi assinada, nenhum certificado real foi carregado, nenhum banco real foi conectado, nenhum DML/DDL real foi executado, nenhuma autorização real foi concedida, SEFAZ real, XML/PDF real, Release real, Canary real, Produção V2 e tráfego produtivo permanecem bloqueados.',
      status: 'AUDITOR_HANDOFF_EVIDENCE_PACKAGE_READY',
      simulationOnly: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
  }
}
