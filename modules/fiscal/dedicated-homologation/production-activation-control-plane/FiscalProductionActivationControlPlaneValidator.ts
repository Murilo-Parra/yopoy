export class FiscalProductionActivationControlPlaneValidator {
  public static validate(input: any) {
    if (!input) return;
    
    const blockedKeywords = [
      'app.use(', 'router.use(', 'fetch(', 'axios', 'request(', 'webhook', 'slack', 'whatsapp',
      'email.send', 'nodemailer', 'pager', 'pagerduty', 'opsgenie', 'DATABASE_URL', 'privateKey',
      'pfx', 'certificate', 'password', 'token', 'INSERT INTO', 'UPDATE', 'DELETE', 'COMMIT',
      'CREATE TABLE', 'ALTER TABLE', 'DROP TABLE', 'request.body', 'response.body', 'req.rawBody',
      'res.send', 'res.json', 'executeRealActivation', 'unlockRealGate', 'issueRealAuthorizationToken',
      'grantAuthorization', 'hardUnlock', 'changeTraffic', 'routeToV2', 'disableLegacy', 'activateV2',
      'activateProduction', 'goLive', 'deploy', 'releaseProduction', 'cutover', 'rollback', 'canary',
      'rollout', 'startRuntimeExecution', 'startCommandQueue', 'enqueueRealJob', 'dispatchRealWorker',
      'createWorker', 'createScheduler', 'createCron', 'shellCommand', 'commandRunner', 'exec(',
      'spawn(', 'child_process', 'queue.process', 'setInterval', 'scheduler', 'cron', 'startWorker',
      'workerThread', 'runtimeExecution', 'queueUnlock', 'enqueueJob', 'dispatchWorker', 'openTransaction',
      'commitTransaction', 'rollbackTransaction', 'dbTransaction', 'signXml', 'generatePdf', 'cryptoSign',
      'readPfx', 'readCertificate', 'readSecret', 'readCertificatePassword', 'readPrivateKey', 'readToken',
      'callRealEndpoint', 'callV2Handler', 'callLegacyHandler', 'sefazCall', 'productionExecution',
      'executeProduction',
      // Force flags
      'forceExecuteRealActivation', 'forceUnlockRealGate', 'forceGrantRealAuthorization',
      'forceIssueRealAuthorizationToken', 'forceActivateProductionV2', 'forceRouteToV2',
      'forceDisableLegacyRoute', 'forceChangeTraffic', 'forceExecuteRealCutover', 'forceExecuteRealGoLive',
      'forceExecuteRealRollout', 'forceExecuteRealRollback', 'forceActivateRealCanary',
      'forceStartRuntimeExecution', 'forceStartCommandQueue', 'forceEnqueueRealJob',
      'forceDispatchRealWorker', 'forceCreateWorker', 'forceCreateScheduler', 'forceCreateCron',
      'forceRunCommandRunner', 'forceExecuteShellCommand', 'forceConnectRealDatabase', 'forceExecuteDml',
      'forceExecuteDdl', 'forceCallRealSefaz', 'forceReadRealCertificate', 'forceReadRealPfx',
      'forceReadCertificatePassword', 'forceReadRealSecret', 'forceReadPrivateKey', 'forceReadToken',
      'forceUseRealCrypto', 'forceSignRealXml', 'forceGenerateRealPdf', 'forceNotifyRealStakeholder',
      'forceNotifyRealOperator', 'forceNotifyRealSre', 'forceNotifyRealCustomer', 'forceSendWebhook',
      'forceSendSlack', 'forceSendWhatsapp', 'forceSendEmail', 'forceSendPager', 'forceSendPagerDuty',
      'forceSendOpsgenie'
    ];

    const stringifiedInput = JSON.stringify(input);

    for (const keyword of blockedKeywords) {
      if (stringifiedInput.includes(keyword)) {
        throw new Error(`Validation Error: Blocked keyword or action detected: ${keyword}`);
      }
    }
    
    // Explicitly validate all force* flags as keys
    for (const key in input) {
        if (key.startsWith('force')) {
            throw new Error(`Validation Error: Force flag detected: ${key}`);
        }
    }
  }
}
