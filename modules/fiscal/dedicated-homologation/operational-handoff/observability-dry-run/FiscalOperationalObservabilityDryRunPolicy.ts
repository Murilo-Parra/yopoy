import { FiscalOperationalObservabilityDryRunInput, FiscalOperationalObservabilityDryRunResult, FiscalOperationalObservabilityDryRunStatus } from './FiscalOperationalObservabilityDryRunTypes';
import { FiscalOperationalObservabilityDryRunValidator } from './FiscalOperationalObservabilityDryRunValidator';

export class FiscalOperationalObservabilityDryRunPolicy {
  public static enforce(input: FiscalOperationalObservabilityDryRunInput): Partial<FiscalOperationalObservabilityDryRunResult> | null {
    const blockers: string[] = [];
    const validation = FiscalOperationalObservabilityDryRunValidator.validate(input);

    if (!validation.valid) {
      blockers.push(...validation.blockers);
    }

    blockers.push('Operational Observability Dry-Run 20.2 é apenas simulação administrativa de observability, alerting, dashboards, SLO/SLA e incident triggers. Nenhuma observability real foi instalada, nenhum alerta produtivo foi criado, nenhum incidente real foi aberto, nenhum operador externo foi notificado, nenhum webhook, Slack, WhatsApp ou email real foi enviado, nenhuma request/response real foi capturada, nenhum runbook real foi executado, nenhuma Produção V2 foi ativada, nenhum tráfego real foi alterado, nenhum app.use legado foi modificado, nenhum middleware/tap real foi instalado, nenhum worker/scheduler foi criado, SEFAZ real, certificado real, XML/PDF real e rotas produtivas permanecem bloqueados.');

    if (blockers.length > 1 || validation.blockers.length > 0) {
      const baseResult = this.getBaseResult();
      return {
        ...baseResult,
        success: false,
        status: FiscalOperationalObservabilityDryRunStatus.BLOCKED_FOR_REAL_OBSERVABILITY_OR_ALERTING,
        validationExecuted: true,
        evaluationExecuted: false,
        decisionSimulated: false,
        go: false,
        noGo: true,
        blockers,
        warnings: validation.warnings
      };
    }

    return null;
  }

  public static getBaseResult(): FiscalOperationalObservabilityDryRunResult {
    return {
      success: true,
      status: FiscalOperationalObservabilityDryRunStatus.OPERATIONAL_OBSERVABILITY_DRY_RUN_READY,
      validationExecuted: true,
      evaluationExecuted: true,
      decisionSimulated: true,
      signalCatalogGenerated: true,
      alertingPlanGenerated: true,
      dashboardReadinessGenerated: true,
      sloSlaMatrixGenerated: true,
      incidentTriggerSimulationGenerated: true,
      telemetryRetentionGenerated: true,
      escalationSignalMatrixGenerated: true,
      go: false,
      noGo: true,
      blockers: ['Operational Observability Dry-Run 20.2 é apenas simulação administrativa de observability, alerting, dashboards, SLO/SLA e incident triggers. Nenhuma observability real foi instalada, nenhum alerta produtivo foi criado, nenhum incidente real foi aberto, nenhum operador externo foi notificado, nenhum webhook, Slack, WhatsApp ou email real foi enviado, nenhuma request/response real foi capturada, nenhum runbook real foi executado, nenhuma Produção V2 foi ativada, nenhum tráfego real foi alterado, nenhum app.use legado foi modificado, nenhum middleware/tap real foi instalado, nenhum worker/scheduler foi criado, SEFAZ real, certificado real, XML/PDF real e rotas produtivas permanecem bloqueados.'],
      warnings: [],
      operationalObservabilityDryRunOnly: true,
      alertingGovernanceDryRunOnly: true,
      observabilityInstalled: false,
      productionAlertCreated: false,
      realIncidentOpened: false,
      externalOperatorNotified: false,
      webhookSent: false,
      slackSent: false,
      whatsappSent: false,
      emailSent: false,
      realRequestCaptured: false,
      realResponseCaptured: false,
      runbookExecuted: false,
      productionV2Activated: false,
      releaseActivated: false,
      trafficChanged: false,
      routeToV2: false,
      routeToLegacy: true,
      appUseModified: false,
      middlewareInstalled: false,
      tapInstalled: false,
      workersCreated: false,
      schedulersCreated: false,
      realExecutionGateUnlocked: false,
      realAuthorizationGranted: false,
      dmlExecuted: false,
      ddlExecuted: false,
      realDatabaseConnected: false,
      realSefazCalled: false,
      realCertificateLoaded: false,
      xmlSigned: false,
      pdfGenerated: false,
      readOnly: true,
      governanceOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      approvedForObservabilityDryRun: true,
      approvedForAlertingGovernanceDryRun: true,
      approvedForRealObservabilityInstall: false,
      approvedForRealAlerting: false,
      approvedForRealIncidentResponse: false,
      approvedForProductionV2: false
    };
  }
}
