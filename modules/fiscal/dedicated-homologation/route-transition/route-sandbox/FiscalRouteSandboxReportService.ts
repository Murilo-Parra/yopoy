export class FiscalRouteSandboxReportService {
  public static getReport() {
    return {
      reportType: 'ROUTE_SANDBOX_BLUEPRINT_AND_WALLED_GARDEN_ISOLATION',
      message: 'O Módulo 23.6 foi encerrado em modo read-only/route-sandbox-blueprint-only/walled-garden-isolation-only/synthetic-only-contract-only/governance-only/simulation-only. Apenas o blueprint administrativo de sandbox de rotas, plano de walled garden, plano de rede documental, plano de isolamento de tenant, plano de fronteira de dados, evidência de ausência de runtime, contrato synthetic-only e matriz de dependências foram preparados. Nenhum sandbox real foi criado, nenhum walled garden real foi criado, nenhuma rede real foi provisionada, nenhum banco real foi provisionado, nenhum tenant real isolado foi criado, nenhuma rota real foi executada, nenhum endpoint real foi chamado, nenhum handler legado real foi chamado, nenhum handler V2 operacional foi chamado, nenhuma request real foi capturada, nenhuma response real foi capturada, nenhum payload real foi capturado, nenhuma request real foi duplicada, nenhum tráfego real foi espelhado, nenhum shadow traffic real foi executado, nenhum cutover real foi executado, nenhuma rota foi direcionada para V2, o legado permanece como rota obrigatória, nenhum tráfego real foi alterado, nenhum proxy real foi instalado, nenhum middleware real foi instalado, nenhum tap real foi instalado, nenhum app.use legado foi modificado, nenhum router.use real foi modificado, nenhuma Produção V2 foi ativada, nenhum release real foi executado, nenhum worker/scheduler foi criado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, nenhum banco real foi conectado, nenhum DDL/DML real foi executado, SEFAZ real, certificado real, PFX, senha, XML/PDF real e rotas produtivas permanecem bloqueados.',
      status: 'WALLED_GARDEN_ISOLATION_READY',
      simulationOnly: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
  }
}
