export class FiscalProductionCanaryDryRunReportService {
  public static getReport() {
    return {
      reportType: 'CANARY_SCOPE_DRY_RUN_AND_TRAFFIC_SWITCH_DRY_RUN',
      message: 'O Módulo 19.2 foi encerrado em modo read-only/canary-scope-dry-run-only/traffic-switch-dry-run-only/governance-only/simulation-only. Apenas a simulação de escopo canário e o dry-run de troca de tráfego foram preparados. Nenhum Canary real foi ativado, nenhum tráfego real foi alterado, nenhum roteamento real para V2 foi instalado, nenhum handler V2 operacional foi chamado, nenhum app.use legado foi modificado, nenhum release real foi executado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, SEFAZ real, certificado real, XML/PDF real, Release real, Canary real, Produção V2 e tráfego produtivo permanecem bloqueados.',
      status: 'TRAFFIC_SWITCH_DRY_RUN_READY',
      simulationOnly: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
  }
}
