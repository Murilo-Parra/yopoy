export class FiscalProductionExecutionFirewallApprovalValidator {
  public static validate(input: any) {
    if (!input) return;

    const blockedKeywords = [
      'app.use(', 'router.use(', 'fetch(', 'axios', 'request(', 'webhook', 'slack', 'whatsapp',
      'email.send', 'nodemailer', 'pager', 'pagerduty', 'opsgenie', 'DATABASE_URL', 'privateKey',
      'pfx', 'certificate', 'password', 'token', 'INSERT INTO', 'UPDATE', 'DELETE', 'COMMIT',
      'CREATE TABLE', 'ALTER TABLE', 'DROP TABLE', 'request.body', 'response.body', 'req.rawBody',
      'res.send', 'res.json', 'concludeRealExecutiveApproval', 'persistRealApprovalRecord',
      'collectRealSignature', 'unlockRealGate', 'grantAuthorization', 'issueRealAuthorizationToken',
      'runRealInfrastructureScanner', 'probeRealRuntime', 'probeRealQueue', 'probeRealWorker',
      'executePhysicalRuntime', 'startRuntimeExecution', 'startCommandQueue', 'enqueueRealJob',
      'dispatchRealWorker', 'createWorker', 'createScheduler', 'createCron', 'shellCommand',
      'commandRunner', 'exec(', 'spawn(', 'child_process', 'queue.process', 'setInterval',
      'scheduler', 'cron', 'startWorker', 'workerThread', 'runtimeExecution', 'queueUnlock',
      'enqueueJob', 'dispatchWorker', 'openTransaction', 'commitTransaction', 'rollbackTransaction',
      'dbTransaction', 'connectDatabase', 'executeDml', 'executeDdl', 'signXml', 'generatePdf',
      'cryptoSign', 'readPfx', 'readCertificate', 'readSecret', 'readCertificatePassword',
      'readPrivateKey', 'readToken', 'callRealEndpoint', 'callV2Handler', 'callLegacyHandler',
      'sefazCall', 'activateV2', 'activateProduction', 'routeToV2', 'disableLegacy', 'changeTraffic',
      'promoteRealTraffic', 'activateRealCanary', 'goLive', 'deploy', 'releaseProduction',
      'cutover', 'rollback', 'rollout', 'installProxy', 'installMiddleware', 'installTap',
      'installMirror', 'installSniffer', 'captureRequest', 'captureResponse', 'capturePayload',
      'duplicateRequest', 'mirrorTraffic', 'shadowTraffic', 'productionExecution',
      'executeProduction', 'bypassPhysicalExecutionFirewall', 'physicalBypass', 'executableDrift'
    ];

    const stringifiedInput = JSON.stringify(input);

    for (const keyword of blockedKeywords) {
      if (stringifiedInput.includes(keyword)) {
        throw new Error(`Validation Error: Blocked action detected: ${keyword}`);
      }
    }

    if (input && typeof input === 'object') {
        for (const key in input) {
            if (key.startsWith('force')) {
                throw new Error(`Validation Error: Force flag detected: ${key}`);
            }
        }
    }
  }
}
