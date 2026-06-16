export class FiscalProductionRollbackKillSwitchReportService {
  public static getReport() {
    return {
      reportType: 'PRODUCTION_ROLLBACK_DRY_RUN_AND_KILL_SWITCH_GOVERNANCE',
      message: 'O Módulo 19.4 foi encerrado em modo read-only/production-rollback-dry-run-only/kill-switch-governance-dry-run-only/governance-only/simulation-only. Apenas o dry-run de rollback, fallback legado e governança de kill-switch foram preparados. Nenhum rollback real foi executado, nenhum kill-switch real foi instalado ou ativado, nenhum tráfego real foi alterado, nenhum roteamento V2 foi instalado, nenhum handler V2 operacional foi chamado, nenhum app.use legado foi modificado, nenhum worker/scheduler foi criado, nenhum gate real foi destravado, nenhuma autorização real foi concedida, SEFAZ real, certificado real, XML/PDF real, Release real, Canary real, Produção V2 e tráfego produtivo permanecem bloqueados.',
      status: 'KILL_SWITCH_GOVERNANCE_DRY_RUN_READY',
      simulationOnly: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
  }
}
