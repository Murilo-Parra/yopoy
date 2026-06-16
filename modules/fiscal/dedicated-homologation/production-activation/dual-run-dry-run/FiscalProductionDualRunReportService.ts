export class FiscalProductionDualRunReportService {
  public static getReport() {
    return {
      reportType: 'PRODUCTION_DUAL_RUN_DRY_RUN_AND_REVERSIBLE_ACTIVATION_TELEMETRY',
      message: 'O Módulo 19.5 foi encerrado em modo read-only/production-dual-run-dry-run-only/reversible-activation-telemetry-only/governance-only/simulation-only. Apenas o dry-run de dual-run, telemetria e ativação reversível foi preparado. Nenhum dual-run real foi executado, nenhum tráfego real foi duplicado, nenhuma request/response real foi capturada, nenhum handler V2 operacional foi chamado, nenhum app.use legado foi modificado, nenhum middleware/tap real foi instalado, nenhuma Produção V2 foi ativada, nenhum rollback real foi executado, nenhum kill-switch real foi instalado, SEFAZ real, certificado real, XML/PDF real, Release real, Canary real, Produção V2 e tráfego produtivo permanecem bloqueados.',
      status: 'REVERSIBLE_ACTIVATION_TELEMETRY_READY',
      simulationOnly: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
  }
}
