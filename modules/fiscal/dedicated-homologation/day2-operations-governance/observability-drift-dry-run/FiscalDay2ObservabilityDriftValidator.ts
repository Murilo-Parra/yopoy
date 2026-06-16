import { FiscalDay2ObservabilityDriftInput } from './FiscalDay2ObservabilityDriftTypes';

export class FiscalDay2ObservabilityDriftValidator {
  public static validate(input: FiscalDay2ObservabilityDriftInput) {
    const blockers: string[] = [];
    const warnings: string[] = [];

    const strJson = JSON.stringify(input || {}).toUpperCase();
    const lowerJson = strJson.toLowerCase();

    const kwToBlock = [
      'app.use(', 'router.use(', 'next(', 'fetch(', 'axios', 'request(',
      'webhook', 'slack', 'whatsapp', 'email.send', 'nodemailer', 'pager', 'opsgenie', 'pagerduty',
      'incident', 'alert', 'oncall', 'runbook', 'mitigation', 'rollback', 'communication', 'postincident', 'statuspage',
      'prometheus', 'grafana', 'datadog', 'newrelic', 'new relic', 'opentelemetry', 'open telemetry', 'loki', 'cloudwatch',
      'metrics', 'telemetry', 'traces', 'logs', 'dashboard', 'alertrule', 'alert rule', 'slo', 'sla', 'driftdetection', 'drift detection',
      'scrape', 'scrapemetrics', 'observe', 'observability', 'monitoring', 'metriccapture', 'capturemetric', 'metricreader', 'telemetryreader',
      'crypto', 'node-forge', 'xml-crypto',
      'DATABASE_URL', 'privateKey', 'pfx', 'certificate', 'password', 'token',
      'INSERT INTO', 'UPDATE ', 'DELETE ', 'COMMIT', 'CREATE TABLE', 'ALTER TABLE', 'DROP TABLE',
      'request.body', 'response.body', 'req.rawbody', 'res.send override', 'res.json override',
      'supportaccess', 'accessgrant', 'privilegeescalation', 'rbacchange', 'assistedsession', 'tenantdata', 'fiscaldocument', 'readxml', 'readpdf', 'readpfx', 'readsecret',
      'escalation', 'notify', 'canary', 'cutover', 'rollout', 'promotetraffic', 'switchtraffic', 'activatev2', 'disablelegacy',
      'mirrortraffic', 'shadowtraffic', 'duplicaterequest', 'captureresponse',
      'deploy', 'releaseproduction', 'activateproduction', 'executableartifact', 'publishpackage', 'binaryartifact', 'shellcommand',
      'commandrunner', 'runcommand', 'exec(', 'spawn(', 'child_process', 'queue.process', 'setinterval',
      'scheduler', 'cron', 'startworker', 'workerthread', 'runtimeexecution', 'executiongraph', 'executegraph', 'queueunlock', 'enqueuejob', 'dispatchworker',
      'processjob', 'opentransaction', 'committransaction', 'rollbacktransaction', 'dbtransaction', 'sefazcall', 'signxml', 'generatepdf', 'cryptosign',
      'productionexecution', 'golive', 'reversiblegolive', 'routetov2', 'trafficswitch', 'reroute', 'rerouting', 'routeswap', 'finalrouteswitch', 'legacydisable',
      'unlockgate', 'grantauthorization', 'executeproduction'
    ];

    for (const kw of kwToBlock) {
      if (lowerJson.includes(kw.toLowerCase()) || strJson.includes(kw)) {
        if (!lowerJson.includes('blueprint') && !lowerJson.includes('readiness') && !lowerJson.includes('noop') && !lowerJson.includes('no-op') && !lowerJson.includes('no-activation') && !lowerJson.includes('contract') && !lowerJson.includes('plan') && !lowerJson.includes('matrix') && !lowerJson.includes('simulation') && !lowerJson.includes('catalog') && !lowerJson.includes('dry-run') && !lowerJson.includes('dryrun') && !lowerJson.includes('no-capture') && !lowerJson.includes('no-read') && !lowerJson.includes('no-persistence') && !lowerJson.includes('no-activation') && !lowerJson.includes('drift')) {
          blockers.push(`${kw} blocked`);
        }
      }
    }

    if (lowerJson.includes('<xml') && lowerJson.length > 500) blockers.push('XML bruto blocked');
    if (lowerJson.includes('pdf') || lowerJson.includes('base64')) warnings.push('PDF/base64 extenso mock warning');
    if (strJson.includes('RES.SEND =') || strJson.includes('RES.JSON =')) blockers.push('res.send override/res.json override blocked');

    const forceKeys = [
      'forceInstallRealObservability', 'forceCaptureRealMetrics', 'forceReadRealTelemetry', 'forceConnectPrometheus', 'forceConnectGrafana', 'forceConnectDatadog', 'forceConnectNewRelic', 'forceConnectOpenTelemetry', 'forceConnectLoki', 'forceConnectCloudWatch', 'forceCreateRealDashboard', 'forceCreateProductionAlert', 'forceActivateRealAlertRule', 'forceEvaluateRealSloSla', 'forcePersistRealMetrics', 'forceOpenRealIncident', 'forceExecuteRealRunbook', 'forceNotifyExternalOperator', 'forceNotifySre', 'forceNotifyStakeholder', 'forceNotifyCustomer', 'forceSendSlack', 'forceSendWhatsapp', 'forceSendEmail', 'forceSendWebhook', 'forceSendPager', 'forceExecuteRealMitigation', 'forceExecuteRealRollback', 'forceChangeRealRbac', 'forceGrantRealSupportAccess', 'forceOpenRealAssistedSession', 'forceAccessRealTenantData', 'forceAccessRealFiscalDocument', 'forceReadRealXml', 'forceReadRealPdf', 'forceReadRealPfx', 'forceReadRealCertificate', 'forceReadRealSecret', 'forceExecuteRealDay2Operation', 'forceActivateProductionV2', 'forceChangeTraffic', 'forceRouteToV2', 'forceDisableLegacyRoute', 'forceInstallProxy', 'forceInstallMiddleware', 'forceInstallTap', 'forceInstallMirror', 'forceInstallSniffer', 'forceEnableShadowTraffic', 'forceMirrorRealTraffic', 'forceDuplicateRequest', 'forceCaptureRequest', 'forceCaptureResponse', 'forceCapturePayload', 'forceModifyAppUse', 'forceModifyRouterUse', 'forceCallRealEndpoint', 'forceCallLegacyHandler', 'forceCallV2Handler', 'forceStartRuntimeExecution', 'forceStartCommandQueue', 'forceUnlockRealQueue', 'forceEnqueueRealJob', 'forceDispatchRealWorker', 'forceCreateWorker', 'forceCreateScheduler', 'forceCreateCron', 'forceRunCommandRunner', 'forceExecuteShellCommand', 'forceOpenRealTransaction', 'forceCommitRealTransaction', 'forceRollbackRealTransaction', 'forceConnectRealDatabase', 'forceExecuteDml', 'forceExecuteDdl', 'forceCallRealSefaz', 'forceLoadRealCertificate', 'forceReadCertificatePassword', 'forceUseRealCrypto', 'forceSignRealXml', 'forceGenerateRealPdf', 'forceExecuteProduction', 'forceGrantRealAuthorization', 'forceUnlockRealGate', 'forceApproveRealDeploy', 'forceExecuteRealDeploy', 'forceExecuteRealRelease', 'forceApproveRealCutover', 'forceExecuteRealCutover', 'forcePublishRealPackage', 'forceGenerateExecutableArtifact'
    ];

    for (const force of forceKeys) {
      if ((input as any)[force]) {
         blockers.push(`${force} blocked`);
      }
    }

    return {
      valid: blockers.length === 0,
      blockers,
      warnings
    };
  }
}
