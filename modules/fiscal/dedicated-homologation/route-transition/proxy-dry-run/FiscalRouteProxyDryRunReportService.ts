export class FiscalRouteProxyDryRunReportService {
  public static getReport() {
    return {
      reportType: 'PROXY_MIDDLEWARE_DRY_RUN_AND_NO_INTERCEPTION',
      message: 'O Módulo 23.2 foi encerrado em modo read-only/proxy-middleware-dry-run-only/no-interception-simulation-only/governance-only/simulation-only. Apenas a simulação administrativa de proxy, middleware, tap, roteamento condicional, evidência de não-interceptação, fallback documental e matriz de dependências foi preparada. Nenhum proxy real foi instalado, nenhum middleware real foi instalado, nenhum tap real foi instalado, nenhum app.use legado foi modificado, nenhum router.use real foi modificado, nenhum tráfego real foi alterado, nenhuma request real foi capturada, nenhuma response real foi capturada, nenhuma rota foi direcionada para V2, o legado permanece como rota obrigatória, nenhum handler V2 operacional foi chamado, nenhum handler legado foi chamado como side-effect, nenhuma Produção V2 foi ativada, nenhum release real foi executado, nenhum canary real foi ativado, nenhum worker/scheduler foi criado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, nenhum banco real foi conectado, nenhum DDL/DML real foi executado, SEFAZ real, certificado real, PFX, senha, XML/PDF real e rotas produtivas permanecem bloqueados.',
      status: 'NO_INTERCEPTION_SIMULATION_READY',
      simulationOnly: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
  }
}
