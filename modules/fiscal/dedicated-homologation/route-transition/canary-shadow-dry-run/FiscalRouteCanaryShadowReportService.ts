export class FiscalRouteCanaryShadowReportService {
  public static getReport() {
    return {
      reportType: 'CANARY_SHADOW_DRY_RUN_AND_TRAFFIC_MIRROR_APPROVAL_GATE',
      message: 'O Módulo 23.3 foi encerrado em modo read-only/canary-shadowing-dry-run-only/traffic-mirror-approval-gate-only/governance-only/simulation-only. Apenas a simulação administrativa de canary, shadow traffic, traffic mirror, approval gate de espelhamento, elegibilidade documental, checklist de segurança, evidência de não-captura, readiness de rollback e matriz de dependências foi preparada. Nenhum canary real foi ativado, nenhum shadow traffic real foi executado, nenhum tráfego real foi espelhado, nenhuma request real foi duplicada, nenhuma response real foi capturada, nenhum payload real foi capturado, nenhum proxy real foi instalado, nenhum middleware real foi instalado, nenhum tap real foi instalado, nenhum app.use legado foi modificado, nenhum router.use real foi modificado, nenhuma rota foi direcionada para V2, o legado permanece como rota obrigatória, nenhum handler V2 operacional foi chamado, nenhum handler legado foi chamado como side-effect, nenhuma Produção V2 foi ativada, nenhum release real foi executado, nenhum worker/scheduler foi criado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, nenhum banco real foi conectado, nenhum DDL/DML real foi executado, SEFAZ real, certificado real, PFX, senha, XML/PDF real e rotas produtivas permanecem bloqueados.',
      status: 'TRAFFIC_MIRROR_APPROVAL_GATE_READY',
      simulationOnly: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
  }
}
