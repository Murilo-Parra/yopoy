import { FiscalProductionOperationsAccessHandoffInput } from './FiscalProductionOperationsAccessHandoffTypes';

export class FiscalProductionOperationsAccessHandoffValidator {
  public static validate(input: FiscalProductionOperationsAccessHandoffInput) {
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
      'grantoperationsaccess', 'modifyrealrbac', 'escalateprivilege', 'createuser', 'modifypermission',
      'openassistedsession', 'readtenantdata', 'readfiscaldocument', 'readxml', 'readpdf', 'readpfx',
      'readcertificate', 'readsecret', 'notifyoperator',
      'executerealoperationstransition', 'activaterealoperations', 'hardunlock', 
      'grantauthorization', 'unlockgate', 'changetraffic', 
      'routetov2', 'disablelegacy', 'activatev2', 'activateproduction', 
      'golive', 'deploy', 'releaseproduction', 'cutover', 'rollback', 'canary', 
      'rollout', 'installproxy', 'installmiddleware', 'installtap', 'installmirror', 'installsniffer', 
      'mirrortraffic', 'shadowtraffic', 'capturerequest', 'captureresponse', 
      'capturepayload', 'callv2handler', 'calllegacyhandler', 'callrealendpoint',
      'shellcommand', 'commandrunner', 'exec(', 'spawn(', 'child_process', 
      'queue.process', 'setinterval', 'scheduler', 'cron', 'startworker', 'workerthread', 
      'runtimeexecution', 'queueunlock', 'enqueuejob', 'dispatchworker', 
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
      'forceGrantRealOperationsAccess', 'forceModifyRealRbac', 'forceEscalateRealPrivilege',
      'forceCreateRealUser', 'forceModifyRealPermission', 'forceOpenRealAssistedSession',
      'forceReadRealTenantData', 'forceReadRealFiscalDocument', 'forceReadRealXml',
      'forceReadRealPdf', 'forceReadRealPfx', 'forceReadRealCertificate', 'forceReadRealSecret',
      'forceNotifyRealOperator', 'forceExecuteRealOperationsTransition', 'forceActivateRealOperations',
      'forceGrantRealAuthorization', 'forceUnlockRealGate', 'forceActivateProductionV2',
      'forceRouteToV2', 'forceDisableLegacyRoute', 'forceChangeTraffic',
      'forceInstallProxy', 'forceInstallMiddleware', 'forceInstallTap', 'forceInstallMirror',
      'forceInstallSniffer', 'forceEnableShadowTraffic', 'forceCaptureRequest',
      'forceCaptureResponse', 'forceCapturePayload', 'forceCallRealEndpoint',
      'forceCallLegacyHandler', 'forceCallV2Handler', 'forceStartRuntimeExecution',
      'forceStartCommandQueue', 'forceEnqueueRealJob', 'forceDispatchRealWorker',
      'forceCreateWorker', 'forceCreateScheduler', 'forceCreateCron', 'forceRunCommandRunner',
      'forceExecuteShellCommand', 'forceConnectRealDatabase', 'forceExecuteDml',
      'forceExecuteDdl', 'forceCallRealSefaz', 'forceLoadRealCertificate', 'forceReadCertificatePassword',
      'forceUseRealCrypto', 'forceSignRealXml', 'forceGenerateRealPdf', 'forceSendWebhook',
      'forceSendSlack', 'forceSendWhatsapp', 'forceSendEmail', 'forceSendPager'
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
