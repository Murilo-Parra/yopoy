export class FiscalLegalSignOffReportService {
  public static getReport() {
    return {
      reportType: 'LEGAL_SIGNOFF_BLUEPRINT_AND_NON_EXECUTABLE_SIGNATURE_CONTRACT_DRY_RUN',
      message: 'O Módulo 21.1 foi encerrado em modo read-only/legal-signoff-blueprint-only/non-executable-signature-contract-only/governance-only/simulation-only. Apenas o blueprint administrativo de assinatura legal, a matriz de signatários, o envelope de assinatura não executável, a matriz de dependências de evidências e o checklist de readiness jurídico foram preparados. Nenhuma assinatura legal real foi concedida, nenhuma assinatura legal foi persistida, nenhum registro legal definitivo foi criado, nenhum certificado real foi carregado, nenhum PFX real foi lido, nenhuma senha de certificado foi lida, nenhum XML real foi assinado, nenhum PDF real foi gerado, nenhum signatário externo foi notificado, nenhuma aprovação real de comitê foi concedida, nenhum risco real foi aceito, nenhum waiver real foi concedido, nenhuma Produção V2 foi ativada, nenhum tráfego real foi alterado, nenhum app.use legado foi modificado, nenhum middleware/tap real foi instalado, nenhum worker/scheduler foi criado, SEFAZ real e rotas produtivas permanecem bloqueados.',
      status: 'NON_EXECUTABLE_SIGNATURE_CONTRACT_READY',
      simulationOnly: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
  }
}
