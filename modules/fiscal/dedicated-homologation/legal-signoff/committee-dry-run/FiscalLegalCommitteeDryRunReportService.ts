export class FiscalLegalCommitteeDryRunReportService {
  public static getReport() {
    return {
      reportType: 'LEGAL_SIGNOFF_COMMITTEE_DRY_RUN_AND_LEGAL_RISK_ACCEPTANCE_REVIEW',
      message: 'O Módulo 21.3 foi encerrado em modo read-only/legal-signoff-committee-dry-run-only/legal-risk-acceptance-review-only/governance-only/simulation-only. Apenas a simulação administrativa do comitê legal, matriz de aprovação, quórum documental, risk acceptance, waiver, revisão de evidências de assinatura e recomendação final foi preparada. Nenhuma aprovação real de comitê foi concedida, nenhuma assinatura legal real foi concedida, nenhuma assinatura legal foi persistida, nenhum registro legal definitivo foi criado, nenhum risco real foi aceito, nenhum waiver real foi concedido, nenhum aprovador ou signatário externo foi notificado, nenhum webhook, Slack, WhatsApp ou email real foi enviado, nenhum certificado real foi carregado, nenhum PFX real foi lido, nenhuma senha de certificado foi lida, nenhum XML real foi assinado, nenhum PDF real foi gerado, nenhuma Produção V2 foi ativada, nenhum tráfego real foi alterado, nenhum app.use legado foi modificado, nenhum middleware/tap real foi instalado, nenhum worker/scheduler foi criado, SEFAZ real e rotas produtivas permanecem bloqueados.',
      status: 'LEGAL_RISK_ACCEPTANCE_REVIEW_READY',
      simulationOnly: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
  }
}
