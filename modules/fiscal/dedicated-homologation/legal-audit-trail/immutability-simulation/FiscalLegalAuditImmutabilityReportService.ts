export class FiscalLegalAuditImmutabilityReportService {
  public static getReport() {
    return {
      reportType: 'LEGAL_AUDIT_IMMUTABILITY_SIMULATION_AND_MOCK_EVIDENCE_SIGNATURE',
      message: 'O Módulo 18.4 foi encerrado em modo read-only/legal-audit-immutability-simulation-only/mock-evidence-signature-only/governance-only/simulation-only. Apenas a simulação de hash, imutabilidade e assinatura mockada de evidência foi preparada. Nenhum hash legal definitivo foi calculado, nenhuma trilha legal real foi assinada, nenhum certificado real foi carregado, nenhum PFX real foi lido, nenhuma senha de certificado foi lida, nenhum endpoint externo real foi chamado, nenhuma trilha legal real foi persistida, nenhum DML/DDL real foi executado, banco real, autorização real, gate unlock real, SEFAZ real, XML/PDF real, Release real, Canary real, Produção V2 e tráfego produtivo permanecem bloqueados.',
      status: 'MOCK_EVIDENCE_SIGNATURE_READY',
      simulationOnly: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
  }
}
