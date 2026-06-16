import { FiscalProductionActivationConsentInput } from './FiscalProductionActivationConsentTypes';

export class FiscalProductionActivationConsentValidator {
  public static validate(input: FiscalProductionActivationConsentInput) {
    const blockers: string[] = [];
    const warnings: string[] = [];

    const strJson = JSON.stringify(input || {}).toUpperCase();
    const lowerJson = strJson.toLowerCase();

    const kwToBlock = [
      'app.use(', 'router.use(', 'fetch(', 'axios', 'request(',
      'webhook', 'slack', 'whatsapp', 'email.send', 'nodemailer', 'pager', 'pagerduty', 'opsgenie',
      'DATABASE_URL', 'privateKey', 'pfx', 'certificate', 'password', 'token',
      'INSERT INTO', 'UPDATE ', 'DELETE ', 'COMMIT', 'CREATE TABLE', 'ALTER TABLE', 'DROP TABLE',
      'request.body', 'response.body', 'req.rawbody', 'res.send override', 'res.json override',
      'grantauthorization', 'unlockgate', 'consentpersist', 'collectsignature', 'digitalsignature',
      'twopersonapproval', 'approvernotification', 'deploy', 'releaseproduction', 'activateproduction', 'activatev2',
      'routetov2', 'disablelegacy', 'promotetraffic', 'switchtraffic', 'reroute', 'cutover', 'rollback', 'canary',
      'rollout', 'golive', 'reversiblegolive', 'mirrortraffic', 'shadowtraffic', 'duplicaterequest',
      'executableartifact', 'publishpackage', 'shellcommand', 'commandrunner', 'exec(', 'spawn(', 'child_process',
      'queue.process', 'setinterval', 'scheduler', 'cron', 'startworker', 'workerthread', 'runtimeexecution',
      'executiongraph', 'queueunlock', 'enqueuejob', 'dispatchworker', 'opentransaction', 'committransaction',
      'rollbacktransaction', 'dbtransaction', 'sefazcall', 'signxml', 'generatepdf', 'cryptosign',
      'productionexecution', 'executeproduction'
    ];

    for (const kw of kwToBlock) {
      if (lowerJson.includes(kw.toLowerCase()) || strJson.includes(kw)) {
        blockers.push(`${kw} blocked`);
      }
    }

    if (lowerJson.includes('<xml') && lowerJson.length > 500) blockers.push('XML bruto blocked');
    if (lowerJson.includes('pdf') || lowerJson.includes('base64')) warnings.push('PDF/base64 extenso mock warning');

    const forceKeys = [
      'forceGrantRealAuthorization', 'forceUnlockRealGate', 'forcePersistRealConsent', 'forceCollectRealSignature',
      'forceCompleteRealTwoPersonApproval', 'forceNotifyRealApprover', 'forceSendWebhook', 'forceSendSlack',
      'forceSendWhatsapp', 'forceSendEmail', 'forceSendPager', 'forceActivateProductionV2', 'forceRouteToV2',
      'forceDisableLegacyRoute', 'forceChangeTraffic', 'forceExecuteRealDeploy', 'forceExecuteRealRelease',
      'forceExecuteRealCutover', 'forceExecuteRealRollback', 'forceActivateRealCanary', 'forceExecuteRealRollout',
      'forceInstallProxy', 'forceInstallMiddleware', 'forceInstallTap', 'forceInstallMirror', 'forceInstallSniffer',
      'forceEnableShadowTraffic', 'forceStartRuntimeExecution', 'forceStartCommandQueue', 'forceUnlockRealQueue',
      'forceEnqueueRealJob', 'forceDispatchRealWorker', 'forceCreateWorker', 'forceCreateScheduler', 'forceCreateCron',
      'forceRunCommandRunner', 'forceExecuteShellCommand', 'forceConnectRealDatabase', 'forceOpenRealTransaction',
      'forceCommitRealTransaction', 'forceRollbackRealTransaction', 'forceExecuteDml', 'forceExecuteDdl',
      'forceCallRealSefaz', 'forceLoadRealCertificate', 'forceReadRealPfx', 'forceReadCertificatePassword',
      'forceUseRealCrypto', 'forceSignRealXml', 'forceGenerateRealPdf', 'forcePublishRealPackage',
      'forceGenerateExecutableArtifact'
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
