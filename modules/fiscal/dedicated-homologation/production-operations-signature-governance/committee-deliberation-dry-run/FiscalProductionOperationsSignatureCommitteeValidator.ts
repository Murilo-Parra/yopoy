export class FiscalProductionOperationsSignatureCommitteeValidator {
  public static validate(input: any) {
    if (!input) return;
    
    const blockedKeywords = [
      'app.use(', 'router.use(', 'fetch(', 'axios', 'request(', 'webhook', 'slack', 'whatsapp',
      'email.send', 'nodemailer', 'pager', 'pagerduty', 'opsgenie', 'DATABASE_URL', 'privateKey',
      'pfx', 'certificate', 'password', 'token', 'INSERT INTO', 'UPDATE', 'DELETE', 'COMMIT',
      'CREATE TABLE', 'ALTER TABLE', 'DROP TABLE', 'request.body', 'response.body', 'req.rawBody',
      'res.send', 'res.json', 'concludeRealCommitteeApproval', 'persistRealDeliberation',
      'persistRealApprovalRecord', 'grantRealSignature', 'collectRealSignature',
      'collectRealCryptographicSignature', 'persistRealConsent', 'persistRealSignatureRecord',
      'persistRealAttestation', 'acceptRealRisk', 'grantRealWaiver', 'notifyRealStakeholder',
      'notifyRealSigner', 'notifyRealApprover', 'completeRealOperationsHandoff', 'activateRealOperations',
      'hardUnlock', 'grantAuthorization', 'unlockGate', 'changeTraffic', 'routeToV2', 'disableLegacy',
      'activateV2', 'activateProduction', 'goLive', 'deploy', 'releaseProduction', 'cutover', 'rollback',
      'canary', 'rollout', 'signXml', 'generatePdf', 'cryptoSign', 'readPfx', 'readCertificate',
      'readSecret', 'readCertificatePassword', 'callRealEndpoint', 'callV2Handler', 'callLegacyHandler',
      'shellCommand', 'commandRunner', 'exec(', 'spawn(', 'child_process', 'queue.process',
      'setInterval', 'scheduler', 'cron', 'startWorker', 'workerThread', 'runtimeExecution',
      'queueUnlock', 'enqueueJob', 'dispatchWorker', 'openTransaction', 'commitTransaction',
      'rollbackTransaction', 'dbTransaction', 'sefazCall', 'productionExecution', 'executeProduction',
      'forceConcludeRealCommitteeApproval', 'forcePersistRealDeliberation', 'forcePersistRealApprovalRecord',
      'forceGrantRealSignature', 'forceCollectRealSignature', 'forceCollectRealCryptographicSignature',
      'forcePersistRealConsent', 'forcePersistRealSignatureRecord', 'forcePersistRealAttestation',
      'forceAcceptRealRisk', 'forceGrantRealWaiver', 'forceNotifyRealStakeholder', 'forceNotifyRealSigner',
      'forceNotifyRealApprover', 'forceSendWebhook', 'forceSendSlack', 'forceSendWhatsapp', 'forceSendEmail',
      'forceSendPager', 'forceSendPagerDuty', 'forceSendOpsgenie', 'forceUnlockRealGate',
      'forceGrantRealAuthorization', 'forceActivateProductionV2', 'forceRouteToV2', 'forceDisableLegacyRoute',
      'forceChangeTraffic', 'forceExecuteRealOperationsTransition', 'forceActivateRealOperations',
      'forceCompleteRealOperationsHandoff', 'forceReadRealCertificate', 'forceReadRealPfx',
      'forceReadCertificatePassword', 'forceReadRealSecret', 'forceUseRealCrypto', 'forceSignRealXml',
      'forceGenerateRealPdf', 'forceConnectRealDatabase', 'forceExecuteDml', 'forceExecuteDdl',
      'forceCallRealSefaz', 'forceStartRuntimeExecution', 'forceStartCommandQueue', 'forceEnqueueRealJob',
      'forceDispatchRealWorker', 'forceCreateWorker', 'forceCreateScheduler', 'forceCreateCron',
      'forceRunCommandRunner', 'forceExecuteShellCommand'
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
