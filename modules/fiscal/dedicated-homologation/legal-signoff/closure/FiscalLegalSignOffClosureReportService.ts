export class FiscalLegalSignOffClosureReportService {
  public static getReport() {
    return {
      reportType: 'LEGAL_SIGNOFF_GOVERNANCE_CLOSURE_AND_FINAL_EVIDENCE_HANDOFF',
      message: 'O Módulo 21 foi encerrado documentalmente em modo read-only/legal-signoff-governance-closure-only/final-legal-evidence-handoff-only/governance-only/simulation-only. Apenas o fechamento documental do domínio Legal Sign-Off, o pacote final de evidências, a prontidão futura de assinatura legal e o handoff administrativo final foram preparados. Nenhuma aprovação real de comitê foi concedida, nenhuma assinatura legal real foi concedida, nenhuma assinatura legal foi persistida, nenhum registro legal definitivo foi criado, nenhum risco real foi aceito, nenhum waiver real foi concedido, nenhum aprovador ou signatário externo foi notificado, nenhum webhook, Slack, WhatsApp ou email real foi enviado, nenhum certificado real foi carregado, nenhum PFX real foi lido, nenhuma senha de certificado foi lida, nenhuma biblioteca criptográfica real foi acionada, nenhum XML real foi assinado, nenhum PDF real foi gerado, nenhuma Produção V2 foi ativada, nenhum tráfego real foi alterado, nenhum app.use legado foi modificado, nenhum middleware/tap real foi instalado, nenhum worker/scheduler foi criado, SEFAZ real e rotas produtivas permanecem bloqueados.',
      status: 'FINAL_LEGAL_EVIDENCE_HANDOFF_READY',
      simulationOnly: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
  }
}
