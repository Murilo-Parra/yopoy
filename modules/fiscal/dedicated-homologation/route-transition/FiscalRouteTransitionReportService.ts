export class FiscalRouteTransitionReportService {
  public static getReport() {
    return {
      reportType: 'ROUTE_TRANSITION_BLUEPRINT_AND_LEGACY_PRESERVATION',
      message: 'O Módulo 23.1 foi encerrado em modo read-only/route-transition-blueprint-only/legacy-preservation-contract-only/governance-only/simulation-only. Apenas o blueprint administrativo de transição de rotas, inventário de rotas legadas, readiness documental de rotas V2, contrato de preservação do legado, contrato de não-interceptação, plano documental de fallback e matriz de dependências foram preparados. Nenhuma transição real de rotas foi executada, nenhum tráfego real foi alterado, nenhuma rota foi direcionada para V2, o legado permanece como rota obrigatória, nenhum app.use legado foi modificado, nenhum middleware, proxy ou tap real foi instalado, nenhum handler V2 operacional foi chamado, nenhum handler legado foi chamado como side-effect, nenhuma Produção V2 foi ativada, nenhum release real foi executado, nenhum canary real foi ativado, nenhum worker/scheduler foi criado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, nenhum banco real foi conectado, nenhum DDL/DML real foi executado, SEFAZ real, certificado real, PFX, senha, XML/PDF real e rotas produtivas permanecem bloqueados.',
      status: 'LEGACY_PRESERVATION_CONTRACT_READY',
      simulationOnly: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
  }
}
