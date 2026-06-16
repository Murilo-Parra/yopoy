export class FiscalFinalGoLiveGateDryRunReportService {
  public static getReport() {
    return {
      reportType: 'FINAL_GOLIVE_GATE_SIMULATION_AND_MOCK_RUNBOOK',
      message: 'O Módulo 22.2 foi encerrado em modo read-only/final-golive-gate-dry-run-only/mock-activation-runbook-only/governance-only/simulation-only. Apenas a simulação administrativa do gate final de Go-Live, elegibilidade, runbook mockado de ativação, unlock simulado, traffic switch simulado, rollback simulado, kill-switch simulado e checkpoints de decisão foram preparados. Nenhuma Produção V2 foi ativada, nenhum tráfego real foi alterado, nenhuma rota foi direcionada para V2, o legado permanece como rota obrigatória, nenhum release real foi executado, nenhum canary real foi ativado, nenhum runbook real foi executado, nenhum app.use legado foi modificado, nenhum middleware/tap real foi instalado, nenhum worker/scheduler foi criado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, nenhuma assinatura legal real foi concedida, nenhuma assinatura legal foi persistida, nenhum registro legal definitivo foi criado, nenhum risco real foi aceito, nenhum waiver real foi concedido, nenhum aprovador/signatário externo foi notificado, nenhum banco real foi conectado, nenhum DDL/DML real foi executado, SEFAZ real, certificado real, PFX, senha, XML/PDF real e rotas produtivas permanecem bloqueados.',
      status: 'MOCK_ACTIVATION_RUNBOOK_READY',
      simulationOnly: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
  }
}
