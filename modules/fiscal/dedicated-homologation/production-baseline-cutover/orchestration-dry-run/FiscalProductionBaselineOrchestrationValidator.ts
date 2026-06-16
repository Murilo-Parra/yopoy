import { FiscalProductionBaselineOrchestrationInput } from './FiscalProductionBaselineOrchestrationTypes';

export class FiscalProductionBaselineOrchestrationValidator {
  public static validate(input: FiscalProductionBaselineOrchestrationInput) {
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
      'orchestraterealcutover', 'executeendpointrollout', 'promoterealroute', 'promoteroute', 'approverealcutover', 
      'approvebaselinecutover', 'executebaselinecutover', 'realcutover', 'hardunlock', 
      'grantauthorization', 'unlockgate', 'changetraffic', 'promotetraffic', 'switchtraffic', 
      'routetov2', 'disablelegacy', 'reroute', 'finalrouteswitch', 'activatev2', 'activateproduction', 
      'golive', 'reversiblegolive', 'deploy', 'releaseproduction', 'cutover', 'rollback', 'canary', 
      'rollout', 'installproxy', 'installmiddleware', 'installtap', 'installmirror', 'installsniffer', 
      'mirrortraffic', 'shadowtraffic', 'duplicaterequest', 'capturerequest', 'captureresponse', 
      'capturepayload', 'callv2handler', 'calllegacyhandler', 'callrealendpoint', 'executableartifact', 
      'publishpackage', 'shellcommand', 'commandrunner', 'exec(', 'spawn(', 'child_process', 
      'queue.process', 'setinterval', 'scheduler', 'cron', 'startworker', 'workerthread', 
      'runtimeexecution', 'executiongraph', 'queueunlock', 'enqueuejob', 'dispatchworker', 
      'opentransaction', 'committransaction', 'rollbacktransaction', 'dbtransaction', 'sefazcall', 
      'signxml', 'generatepdf', 'cryptosign', 'productionexecution', 'executeproduction'
    ];

    for (const kw of kwToBlock) {
      if (lowerJson.includes(kw.toLowerCase()) || strJson.includes(kw)) {
        blockers.push(`${kw} blocked`);
      }
    }

    if (lowerJson.includes('<xml') && lowerJson.length > 500) blockers.push('XML bruto blocked');
    if (lowerJson.includes('pdf') || lowerJson.includes('base64')) warnings.push('PDF/base64 extenso mock warning');

    const forceKeys = [
      'forceOrchestrateRealCutover', 'forceExecuteRealEndpointRollout', 'forcePromoteRealRoute',
      'forceExecuteRealCutover', 'forceExecuteRealGoLive', 'forceApproveRealCutover', 'forceGrantRealAuthorization', 'forceUnlockRealGate',
      'forceActivateProductionV2', 'forceRouteToV2', 'forceDisableLegacyRoute', 'forceChangeTraffic',
      'forceInstallProxy', 'forceInstallMiddleware', 'forceInstallTap', 'forceInstallMirror', 'forceInstallSniffer',
      'forceEnableShadowTraffic', 'forceMirrorRealTraffic', 'forceDuplicateRequest', 'forceCaptureRequest',
      'forceCaptureResponse', 'forceCapturePayload', 'forceCallRealEndpoint', 'forceCallLegacyHandler',
      'forceCallV2Handler', 'forceExecuteRealDeploy', 'forceExecuteRealRelease', 'forceExecuteRealRollback',
      'forceActivateRealCanary', 'forceExecuteRealRollout', 'forceStartRuntimeExecution', 'forceStartCommandQueue',
      'forceUnlockRealQueue', 'forceEnqueueRealJob', 'forceDispatchRealWorker', 'forceCreateWorker',
      'forceCreateScheduler', 'forceCreateCron', 'forceRunCommandRunner', 'forceExecuteShellCommand',
      'forceConnectRealDatabase', 'forceOpenRealTransaction', 'forceCommitRealTransaction', 'forceRollbackRealTransaction',
      'forceExecuteDml', 'forceExecuteDdl', 'forceCallRealSefaz', 'forceLoadRealCertificate', 'forceReadRealPfx',
      'forceReadCertificatePassword', 'forceUseRealCrypto', 'forceSignRealXml', 'forceGenerateRealPdf',
      'forceSendWebhook', 'forceSendSlack', 'forceSendWhatsapp', 'forceSendEmail', 'forceSendPager',
      'forcePublishRealPackage', 'forceGenerateExecutableArtifact'
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
