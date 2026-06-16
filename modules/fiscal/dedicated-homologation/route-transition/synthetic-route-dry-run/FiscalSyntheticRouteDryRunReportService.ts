export class FiscalSyntheticRouteDryRunReportService {
  public static getReport() {
    return {
      reportType: 'SYNTHETIC_ROUTE_DRY_RUN_AND_RESPONSE_SHAPE_COMPARATOR',
      message: 'O Módulo 23.5 foi encerrado em modo read-only/synthetic-route-dry-run-only/response-shape-comparator-only/governance-only/simulation-only. Apenas a simulação administrativa end-to-end baseada em safe-shapes, catálogos sintéticos de resposta legada e V2, comparador de formatos, matriz de compatibilidade, diff contratual sintético e evidência de ausência de chamada a handlers reais foram preparados. Nenhuma rota real foi executada, nenhum endpoint real foi chamado, nenhum handler legado real foi chamado, nenhum handler V2 operacional foi chamado, nenhuma request real foi capturada, nenhuma response real foi capturada, nenhum payload real foi capturado, nenhuma request real foi duplicada, nenhum tráfego real foi espelhado, nenhum shadow traffic real foi executado, nenhum cutover real foi executado, nenhuma rota foi direcionada para V2, o legado permanece como rota obrigatória, nenhum tráfego real foi alterado, nenhum proxy real foi instalado, nenhum middleware real foi instalado, nenhum tap real foi instalado, nenhum app.use legado foi modificado, nenhum router.use real foi modificado, nenhuma Produção V2 foi ativada, nenhum release real foi executado, nenhum worker/scheduler foi criado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, nenhum banco real foi conectado, nenhum DDL/DML real foi executado, SEFAZ real, certificado real, PFX, senha, XML/PDF real e rotas produtivas permanecem bloqueados.',
      status: 'RESPONSE_SHAPE_COMPARATOR_READY',
      simulationOnly: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
  }
}
