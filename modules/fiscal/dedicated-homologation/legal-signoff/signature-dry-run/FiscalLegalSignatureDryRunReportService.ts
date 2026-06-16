export class FiscalLegalSignatureDryRunReportService {
  public static getReport() {
    return {
      reportType: 'LEGAL_SIGNOFF_SIMULATION_GATE_AND_MOCK_SIGNATURE_WORKFLOW_DRY_RUN',
      message: 'O Módulo 21.2 foi encerrado em modo read-only/legal-signoff-simulation-gate-only/mock-signature-workflow-only/governance-only/simulation-only. Apenas a simulação administrativa do gate de assinatura legal, elegibilidade de signatários, envelope de intenção de assinatura, workflow de mock signature, quórum documental, revisão SoD e revisão de evidências foi preparada. Nenhuma assinatura legal real foi concedida, nenhuma assinatura legal foi persistida, nenhum registro legal definitivo foi criado, nenhum certificado real foi carregado, nenhum PFX real foi lido, nenhuma senha de certificado foi lida, nenhum XML real foi assinado, nenhum PDF real foi gerado, nenhum signatário externo foi notificado, nenhum webhook, Slack, WhatsApp ou email real foi enviado, nenhuma aprovação real de comitê foi concedida, nenhum risco real foi aceito, nenhum waiver real foi concedido, nenhuma Produção V2 foi ativada, nenhum tráfego real foi alterado, nenhum app.use legado foi modificado, nenhum middleware/tap real foi instalado, nenhum worker/scheduler foi criado, SEFAZ real e rotas produtivas permanecem bloqueados.',
      status: 'MOCK_SIGNATURE_WORKFLOW_READY',
      simulationOnly: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
  }
}
