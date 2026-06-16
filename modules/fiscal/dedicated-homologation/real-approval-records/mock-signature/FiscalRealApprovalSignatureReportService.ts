export class FiscalRealApprovalSignatureReportService {
  public static getReport() {
    return {
      reportType: 'MOCK_SIGNATURE_AND_EXTERNAL_AUTHORIZATION_SIMULATION',
      message: 'O Módulo 17.4 foi encerrado em modo read-only/mock-signature-only/external-authorization-simulation-only/governance-only/simulation-only. Apenas a simulação de assinatura mockada e autorização externa sintética foi preparada. Nenhum certificado real foi carregado, nenhum PFX real foi lido, nenhuma senha de certificado foi lida, nenhum approval record real foi assinado, nenhum endpoint externo real foi chamado, nenhuma autorização real foi concedida, nenhum DML real foi executado, SEFAZ real, XML/PDF real, Release real, Canary real, Produção V2 e tráfego produtivo permanecem bloqueados.',
      status: 'MOCK_SIGNATURE_READY',
      simulationOnly: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
  }
}
