import { FiscalDay2OperationsClosureInput } from './FiscalDay2OperationsClosureTypes';

export class FiscalDay2OperationsClosureValidator {
  public static validate(input: FiscalDay2OperationsClosureInput) {
    const blockers: string[] = [];
    const warnings: string[] = [];

    const strJson = JSON.stringify(input || {}).toUpperCase();
    const lowerJson = strJson.toLowerCase();

    const kwToBlock = [
      'app.use(', 'router.use(', 'next(', 'fetch(', 'axios', 'request(',
      'webhook', 'slack', 'whatsapp', 'email.send', 'nodemailer', 'pager', 'opsgenie', 'pagerduty',
      'incident', 'alert', 'oncall', 'runbook', 'mitigation', 'rollback', 'communication', 'postincident', 'statuspage',
      'prometheus', 'grafana', 'datadog', 'newrelic', 'loki', 'cloudwatch',
      'handoff', 'hand-off', 'delegate', 'supportaccess', 'accessgrant', 'privilegeescalation', 'rbacchange', 'assistedsession',
      'observability', 'monitoring', 'metrics', 'escalation', 'notify', 'canary', 'cutover', 'rollout', 'promotetraffic', 'switchtraffic', 'activatev2', 'disablelegacy',
      'deploy', 'releaseproduction', 'activateproduction', 'readxml', 'readpdf', 'readsecret', 'tenantdata'
    ];

    for (const kw of kwToBlock) {
      if (lowerJson.includes(kw.toLowerCase()) || strJson.includes(kw)) {
        if (!lowerJson.includes('blueprint') && !lowerJson.includes('readiness') && !lowerJson.includes('noop') && !lowerJson.includes('no-op') && !lowerJson.includes('no-activation') && !lowerJson.includes('contract') && !lowerJson.includes('plan') && !lowerJson.includes('matrix') && !lowerJson.includes('simulation') && !lowerJson.includes('catalog') && !lowerJson.includes('dry-run') && !lowerJson.includes('dryrun') && !lowerJson.includes('no-capture') && !lowerJson.includes('no-read') && !lowerJson.includes('no-persistence') && !lowerJson.includes('drift') && !lowerJson.includes('closure') && !lowerJson.includes('signoff') && !lowerJson.includes('sign-off') && !lowerJson.includes('evidence')) {
          blockers.push(`${kw} blocked`);
        }
      }
    }

    const forceKeys = [
      'forceApproveRealHandoff', 'forceExecuteRealHandoff', 'forceInstallRealObservability', 'forceCaptureRealMetrics', 'forceReadRealTelemetry', 'forceCreateRealDashboard', 'forceCreateProductionAlert', 'forceActivateRealAlertRule', 'forceEvaluateRealSloSla', 'forcePersistRealMetrics', 'forceOpenRealIncident', 'forceExecuteRealRunbook', 'forceNotifyExternalOperator', 'forceNotifySre', 'forceNotifyStakeholder', 'forceNotifyCustomer', 'forceSendSlack', 'forceSendWhatsapp', 'forceSendEmail', 'forceSendWebhook', 'forceSendPager', 'forceExecuteRealMitigation', 'forceExecuteRealRollback', 'forceChangeRealRbac', 'forceGrantRealSupportAccess', 'forceOpenRealAssistedSession', 'forceAccessRealTenantData', 'forceAccessRealFiscalDocument', 'forceReadRealXml', 'forceReadRealPdf', 'forceReadRealPfx', 'forceReadRealCertificate', 'forceReadRealSecret', 'forceExecuteRealDay2Operation', 'forceActivateProductionV2', 'forceChangeTraffic', 'forceRouteToV2', 'forceDisableLegacyRoute'
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
